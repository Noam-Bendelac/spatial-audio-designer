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
      {/*Its not loading full correctly but theres no full documentation on all possible properties so I'm just
      taking shots in the dark*/}
      <Environment background near={0} far={15} resolution={256} preset="warehouse"/>
      {/* <Environment
              background={'only'} // Whether to affect scene.background
              files={['ballroom_4k.hdr']}//.hdr
              near={0}
              far={15}
              path={'./'}
            /> */}
      {/* <Environment preset="sunset" background /> */}
      <CameraController/>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {scene.soundSources.map(soundSource => <SoundSource soundSource={soundSource} />)} 
    </Canvas>
  </div>
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



