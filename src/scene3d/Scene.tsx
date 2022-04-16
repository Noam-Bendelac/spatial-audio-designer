import classNames from 'classnames'
import { AudioLoader, Mesh, Vector3 } from 'three'
import * as THREE from 'three'
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as model from 'model/model'
import { SoundSource } from 'scene3d/SoundSource'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"



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




