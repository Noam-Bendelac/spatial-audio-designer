import classNames from 'classnames'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { useEffect, Suspense, useMemo, useState, Dispatch } from 'react'
import * as model from 'model/model'
import { SoundSource } from 'scene3d/SoundSource'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Environment, Html } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLimitFramerate } from 'scene3d/useFramerate'
import { AudioListener, AudioLoader } from 'three'
import { listenerContext } from 'scene3d/listenerContext'
import { SyncPromise } from 'SyncPromise'
import styles from 'ui/App.module.css'
import { HeatmapRenderer } from 'scene3d/HeatmapRenderer'
import { useMemoCompare } from 'useMemoCompare'



export const Scene = ({ 
  scene,
  showCones,
  showHeatmap,
  selectedSoundIdx,
  setSelectedSoundIdx,
  className,
}: {
  scene: model.Scene,
  showCones: boolean,
  showHeatmap: boolean,
  selectedSoundIdx: number | null,
  setSelectedSoundIdx: Dispatch<number>,
  className?: string,
}) => {
  
  
  // using classNames() allows to combine className from outside with other
  //  classes defined in this file
  return <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
    <div className={classNames(className)}>
      <Canvas frameloop={'demand'}>
        <SceneContents
          scene={scene}
          showCones={showCones}
          showHeatmap={showHeatmap}
          selectedSoundIdx={selectedSoundIdx}
          setSelectedSoundIdx={setSelectedSoundIdx}
        />
      </Canvas>
    </div>
  </Suspense>
}


// this separation from Scene is needed to be able to use threejs hooks
const SceneContents = ({
  scene,
  showCones,
  showHeatmap,
  selectedSoundIdx,
  setSelectedSoundIdx,
}: {
  scene: model.Scene,
  showCones: boolean,
  showHeatmap: boolean,
  selectedSoundIdx: number | null,
  setSelectedSoundIdx: Dispatch<number>,
}) => {
  useLimitFramerate(true)
  
  // place listener (where spatial audio is "measured") where camera is
  const camera = useThree(state => state.camera)
  const listener = useMemo(() => new AudioListener(), [])
  useEffect(() => {
    camera.add(listener)
  }, [camera, listener])
  
  const { audioClips, audioReady } = useAudioClips(scene.soundSources.map(soundSource => soundSource.soundClip))
  
  return <>
    <listenerContext.Provider value={listener}>
      <GltfHeatmap
        src={"https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/16e2408/2.0/Sponza/glTF/Sponza.gltf"}
        soundSources={scene.soundSources}
        showHeatmap={showHeatmap}
      />
      <EnvironmentHandler/>
      <CameraController/>
      <ambientLight /> 
      <pointLight position={[10, 10, 10]} />
      {scene.soundSources.map((soundSource, idx) => <SoundSource
        key={`${soundSource.name}-${soundSource.soundClip}`}
        soundSource={soundSource}
        audioBuffer={soundSource.soundClip === null
          ? null
          : (audioClips.get(soundSource.soundClip)?.ifResolved() ?? null)
        }
        play={/* (TODO) globalPlay && */ audioReady}
        showCones={showCones}
        selected={selectedSoundIdx === idx}
        onClick={() => setSelectedSoundIdx(idx)}
      />)}
      { !audioReady && <Html center>Audio is loading...</Html> }
    </listenerContext.Provider>
  </>
}


const useAudioClips = (urls: (string | null)[]) => {
  // since urls is recomputed every render, memoize it by a deep comparison to
  // avoid extraneous setStates/rerenders
  const urlsMemo = useMemoCompare(urls, (previous, next) => {
    // return true if equal
    if (!previous) return false
    if (previous.length !== next.length) return false
    return previous.every((prevUrl, idx) => {
      const nextUrl = next[idx]
      return prevUrl === nextUrl
    })
  })
  
  // mutable map of loading/loaded audio clips
  const audioClips = useMemo(() => new Map<string, SyncPromise<AudioBuffer>>(), [])
  const [audioReady, setAudioReady] = useState(false)
  const loader = useMemo(() => new AudioLoader(), [])
  useEffect(() => {
    urlsMemo.forEach(url => {
      if (!url) return
      if (!audioClips.has(url)) {
        // hasn't already started loading; add it to the map
        audioClips.set(url, new SyncPromise(loader.loadAsync(url)))
        // TODO: memory leak that's not a problem with our small demo:
        // if the scene is completely changed out and there are all new urls,
        // the old audio buffers are still stored in audioClips. it would be
        // better to make a new map or the new urls, copy the urls it has in
        // common with the old map, and load the new urls; then the old urls
        // with no reference will be GCed
        
        // stop playing audio while loading
        setAudioReady(false)
      }
    })
    
    Promise.all(Array.from(audioClips.values()).map(sync => sync.promise)).then(() => {
      // rerender only when all clips are done loading
      setAudioReady(true)
    })
  }, [urlsMemo, audioClips, loader])
  
  return { audioClips, audioReady }
}




const EnvironmentHandler = () => {
  return (
    <Environment
      background//={'only'} // Whether to affect scene.background
      files="../../assets/evening_meadow_4k.hdr"//.hdr
      preset={undefined}
    /> 
  )
}



const GltfHeatmap = ({
  src,
  soundSources,
  showHeatmap,
}: {
  src: string,
  soundSources: model.SoundSource[],
  showHeatmap: boolean,
}) => {
  const sceneGroup = useGltf(src)
  
  return <HeatmapRenderer sceneGroup={sceneGroup} soundSources={soundSources} showHeatmap={showHeatmap} />
}

const useGltf = (src: string) => {
  return useLoader(GLTFLoader, src).scene
}


const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement)

      controls.maxDistance = 100
      camera.position.set(0, 5, -1)
      controls.update()
      return () => {
        controls.dispose()
      }
    },
    [camera, gl]
  )
  return null
}



