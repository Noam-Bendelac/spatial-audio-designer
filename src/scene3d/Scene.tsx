import classNames from 'classnames'
import { Loader, Mesh } from 'three'
import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { models3D } from 'assets'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'



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
      <Suspense fallback={null}>
      <SceneContents />
      </Suspense>
    </Canvas>
  </div>
}


const SceneContents = () => {
  const materials = useLoader(MTLLoader, "/assets/3D-models/fox/low-poly-fox-by-pixelmannen.mtl")
  const obj = useLoader(OBJLoader, models3D[0].url, (loader: Loader & {setMaterials?:any}) => {
    materials.preload();
    console.log(loader, loader.setMaterials)
    loader.setMaterials(materials);
    
  })
  // const obj = useLoader(OBJLoader, models3D[0].url, (loader) => {
  //   materials.preload();
  //   loader.setMaterials(materials);
  // })
  
  return <>
    <axesHelper />
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {/* <Box position={[0, 0, 0]} /> */}
    {/* <Box position={[2, 0, 0]} />
    <Box position={[0, 4, 0]} />
    <Box position={[0, 0, -6]} /> */}
    {/* <Box position={[1.2, 0, 0]} /> */}
    <Suspense fallback={<Box position={[1.2, 0, 0]} />}>
      <primitive object={obj} position={[30,-20,-120]} />
      
    </Suspense>
    
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

