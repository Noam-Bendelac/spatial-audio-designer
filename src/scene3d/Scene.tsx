import classNames from 'classnames'
import { Mesh } from 'three'
import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { speaker } from 'assets'



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
    <Canvas frameloop={loop ? 'always' : 'never'}>
      <SceneContents />
    </Canvas>
  </div>
}


const SceneContents = () => {
  
  return <>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
    <Suspense fallback={<Box position={[0, 0, -10]} />}>
      <PlaceholderSpeaker />
    </Suspense>
  </>
}


// due to the way the useLoader hook works, it seems this component suspends and
// must have a <Suspense> *outside* this component
const PlaceholderSpeaker = () => {
  const obj = useLoader(OBJLoader, speaker)
  
  return <primitive object={obj} position={[30,-20,-120]} />
    
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

