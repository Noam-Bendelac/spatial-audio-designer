import classNames from 'classnames'
import { Mesh, Vector3 } from 'three'
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
      <SceneContents scene={scene} />
      <CameraController />
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

            controls.minDistance = 3;
            controls.maxDistance = 20;
            return () => {
                controls.dispose()
            }
        },
        [camera, gl]
    )
    return null
}


const SceneContents = ({ scene }: { scene: model.Scene }) => {
  
  return <>
    {/* static lights */}
    {/* TODO environment/background */}
    
    {/* this loop *may* benefit from being wrapped in a simple component */}
    
    {/* <Suspense fallback={<Box position={[0, 0, -10]} />}>
      <PlaceholderSpeaker />
    </Suspense> */}
  </>
}

    // copied from https://github.com/pmndrs/react-three-fiber
    export const AudioField = (props: MeshProps) => {
        const ref = useRef<Mesh>(null!)
        
        const [hovered, setHovered] = useState(false)
        const [clicked, setClicked] = useState(false)
        
        useFrame(() => {
            // ref.current.rotation.x += 0.01
            // ref.current.rotation.y += 0.01
        })
        
        return (
            <mesh 
            
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            rotation = {[Math.PI, 0, 0]}            
            
            onClick={() => setClicked(!clicked)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            >
            <coneGeometry args={[4, 3, 30]} />
            <meshPhongMaterial color='green' opacity={0.1} transparent={true}/>
            {/* <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
            </mesh>
        )
    }

