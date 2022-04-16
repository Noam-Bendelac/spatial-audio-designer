import { Mesh } from 'three'
import * as THREE from 'three'
import { MeshProps, useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'

export const AudioField = (props: MeshProps) => {
    const { camera } = useThree();
    const ref = useRef<Mesh>(null!)
    const [clicked, setClicked] = useState(false)

    const listener = new THREE.AudioListener()
    camera.add(listener)    
    const sound = new THREE.PositionalAudio(listener)
    const audioLoader = new THREE.AudioLoader()
    useEffect(
        () => {
            
            audioLoader.load('../../assets/melody.mp3', function(buffer) {
                sound.setBuffer(buffer)
                // sound.setRefDistance(20)
                sound.setVolume(.2)
                sound.setDirectionalCone(90, 0, 0)
                sound.setMaxDistance(500)
                console.log(sound.getMaxDistance())
                console.log(Math.abs(Math.tan(sound.panner.coneInnerAngle) * sound.getMaxDistance()))
                if (clicked) {
                    sound.play()
                }
            })
        }        
    )

    return (
        <mesh 
        
        {...props}
        ref={ref}
        scale={1}
        visible={!clicked ? true : false}
        rotation = {[Math.PI, 0, 0]}            
        
        onClick={() => setClicked(!clicked)}
        >
        <coneGeometry args={[Math.abs(Math.tan(sound.panner.coneInnerAngle) * sound.getMaxDistance()), sound.getMaxDistance(), 30]} />
        <meshPhongMaterial color='red' opacity={0.2} transparent={true}/>
        </mesh>        
    )
}