import classNames from 'classnames'
import { Mesh } from 'three'
import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { Component, ReactChildren, Suspense, useRef, useState } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ErrorBoundary } from 'react-error-boundary'
import { Environment } from '@react-three/drei'


export const Scene = ({
  loop,
  className,
}: {
  loop: boolean,
  className?: string,
}) => {
  // using classNames() allows to combine className from outside with other
  //  classes defined in this file
  return <div className={classNames(className)}>
    <ErrorBoundary fallback={<div>error</div>}>
      <Suspense fallback={<div>loading</div>}>
        <Canvas frameloop={loop ? 'always' : 'never'}>
          {/* <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} /> */}
          <Gltf src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf" />
          <Environment preset="sunset" background />
        </Canvas>
      </Suspense>
    </ErrorBoundary>
  </div>
}


// copied from https://github.com/pmndrs/react-three-fiber
const Box = (props: MeshProps) => {
  const ref = useRef<Mesh>(null!)
  
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  
  useFrame(() => {
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.01
  })
  
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


const Gltf = ({ src }: { src: string }) => {
  const gltf = useLoader(GLTFLoader, src)
  return (
    <primitive object={gltf.scene} />
  )
}

