import classNames from 'classnames'
import { AudioLoader, Mesh, Vector3 } from 'three'
import * as THREE from 'three'
import { Canvas, MeshProps, useFrame, useThree, useLoader } from '@react-three/fiber'
import { useRef, useState, useEffect, Suspense } from 'react'
import * as model from 'model/model'
import { SoundSource } from 'scene3d/SoundSource'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


{/* <Stage contactShadow shadows adjustCamera intensity={1} environment="city" preset="rembrandt" controls={controlsRef}>
  <mesh />
</Stage> */}

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
  return <div className={classNames(className)}>
    <Canvas frameloop={loop ? 'always' : 'never'}>
        <Suspense fallback={null}>
          <Gltf src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/16e2408/2.0/Sponza/glTF/Sponza.gltf" />
      <EnvironmentHandler/>
      </Suspense>
      <CameraController/>
      <ambientLight /> 
      <pointLight position={[10, 10, 10]} />
      {scene.soundSources.map(soundSource => <SoundSource soundSource={soundSource} />)} 
      {/* <button>Test</button> */}
    </Canvas>
  </div>
}

const EnvironmentHandler = () => {
  return (
    <Environment
              background//={'only'} // Whether to affect scene.background
              files="../../assets/ballroom_4k.hdr"//.hdr
              near={0}
              far={15}
              preset={undefined}
    /> 
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



