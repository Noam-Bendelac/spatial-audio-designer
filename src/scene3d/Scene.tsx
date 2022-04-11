import classNames from 'classnames'
import { Mesh } from 'three'
import { Canvas, MeshProps, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as model from 'model/model'
import { SoundSource } from 'scene3d/SoundSource'



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
      <SceneContents scene={scene} />
    </Canvas>
  </div>
}


const SceneContents = ({ scene }: { scene: model.Scene }) => {
  
  return <>
    {/* static lights */}
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {/* boxes for testing, will get rid of these */}
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
    {/* TODO environment/background */}
    
    {/* this loop *may* benefit from being wrapped in a simple component */}
    {scene.soundSources.map(soundSource => <SoundSource soundSource={soundSource} />)}
    
    {/* <Suspense fallback={<Box position={[0, 0, -10]} />}>
      <PlaceholderSpeaker />
    </Suspense> */}
  </>
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

