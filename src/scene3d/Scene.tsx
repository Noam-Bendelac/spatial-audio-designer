import classNames from 'classnames'
import { Canvas, useThree, useLoader } from '@react-three/fiber'
import { useEffect, Suspense, useMemo, useState } from 'react'
import * as model from 'model/model'
import { SoundSource } from 'scene3d/SoundSource'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLimitFramerate } from 'scene3d/useFramerate'
import { AudioListener, AudioLoader } from 'three'
import { listenerContext } from 'scene3d/listenerContext'
import { SyncPromise } from 'SyncPromise'
import styles from 'ui/App.module.css'



export const Scene = ({ 
  scene,
  loop,
  className,
}: {
  scene: model.Scene,
  loop: boolean,
  className?: string,
}) => {
  
  
  // using classNames() allows to combine className from outside with other
  //  classes defined in this file
  return <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
    <div className={classNames(className)}>
      <Canvas frameloop={'demand'}>
        <SceneContents scene={scene} loop={loop} />
      </Canvas>
    </div>
  </Suspense>
}


// this separation from Scene is needed to be able to use threejs hooks
const SceneContents = ({ scene, loop }: {
  scene: model.Scene,
  loop: boolean,
}) => {
  useLimitFramerate(loop)
  
  // place listener (where spatial audio is "measured") where camera is
  const camera = useThree(state => state.camera)
  const listener = useMemo(() => new AudioListener(), [])
  useEffect(() => {
    camera.add(listener)
  }, [camera, listener])
  
  const { audioClips, audioReady } = useAudioClips(scene.soundSources.map(soundSource => soundSource.soundClip))
  
  return <>
    <listenerContext.Provider value={listener}>
      {/* <Suspense fallback={null}> */}
        <Gltf src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/16e2408/2.0/Sponza/glTF/Sponza.gltf" />
        <EnvironmentHandler/>
      {/* </Suspense> */}
      <CameraController/>
      <ambientLight /> 
      <pointLight position={[10, 10, 10]} />
      {scene.soundSources.map((soundSource, idx) => <SoundSource
        // this is only ok because removing sources isn't supported
        key={idx}
        soundSource={soundSource}
        audioBuffer={soundSource.soundClip === null
          ? null
          : (audioClips.get(soundSource.soundClip)?.ifResolved() ?? null)
        }
        play={/* (TODO) globalPlay && */ audioReady}
      />)} 
      {/* <button>Test</button> */}
    </listenerContext.Provider>
  </>
}


const useAudioClips = (urls: (string | null)[]) => {
  // mutable map of loading/loaded audio clips
  const audioClips = useMemo(() => new Map<string, SyncPromise<AudioBuffer>>(), [])
  const [audioReady, setAudioReady] = useState(false)
  const loader = useMemo(() => new AudioLoader(), [])
  useEffect(() => {
    urls.forEach(url => {
      if (!url) return
      if (!audioClips.has(url)) {
        // hasn't already started loading; add it to the map
        audioClips.set(url, new SyncPromise(loader.loadAsync(url)))
      }
    })
    
    Promise.all(Array.from(audioClips.values()).map(sync => sync.promise)).then(() => {
      // rerender only when all clips are done loading
      setAudioReady(true)
    })
    
    // purposefully leave out scene dependency to only load once;
    // this would break if adding/removing sound sources or changing the filename
    // were added
  }, [audioClips, loader])
  
  return { audioClips, audioReady }
}




const EnvironmentHandler = () => {
  return (
    <Environment
      background//={'only'} // Whether to affect scene.background
      files="../../assets/evening_meadow_4k.hdr"//.hdr
      preset={undefined}
    /> 
    // <Environment
    //   background//={'only'} // Whether to affect scene.background
    //   files="../../assets/ballroom_4k.hdr"//.hdr
    //   near={0}
    //   far={15}
    //   preset={undefined}
    // /> 
    // <Environment
    //           background={'only'} // Whether to affect scene.background
    //           files="../../assets/mosaic_tunnel_4k.hdr"//.hdr
    // />
    // <Environment
    //           background={'only'} // Whether to affect scene.background
    //           files="../../assets/small_cathedral_02_4k.hdr"//.hdr
    //           near={0}
    //           far={15}
    //           preset={undefined} 
    // />
  )
}


const Gltf = ({ src }: { src: string }) => {
  const gltf = useLoader(GLTFLoader, src)
  return (
    <primitive object={gltf.scene} />
  )
}


const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement)

      controls.maxDistance = 100
      return () => {
        controls.dispose()
      }
    },
    [camera, gl]
  )
  return null
}



