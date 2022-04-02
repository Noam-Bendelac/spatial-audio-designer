import classNames from 'classnames'
import { Mesh } from 'three'
import { Canvas, MeshProps, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"


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
            <CameraController />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
            </Canvas>
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

