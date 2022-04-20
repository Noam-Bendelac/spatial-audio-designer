import * as THREE from 'three'
import { MeshProps, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'



export const AudioField = (props: MeshProps) => {
  const { camera } = useThree();
  const [clicked, setClicked] = useState(false)
  const [sound, setSound] = useState<THREE.PositionalAudio | null>(null)

  useEffect(
    () => {
      const listener = new THREE.AudioListener()
      camera.add(listener)    
      const soundObject = new THREE.PositionalAudio(listener)
      soundObject.setRefDistance(20)
      soundObject.setVolume(.2)
      soundObject.setDirectionalCone(90, 100, 0)
      soundObject.setMaxDistance(10)
      setSound(soundObject)
    }, [camera]
  )
  useEffect(
    () => {
      const audioLoader = new THREE.AudioLoader()
      audioLoader.load('../../assets/melody.mp3', function(buffer) {
        sound?.setBuffer(buffer)
      })            
    }, [sound]
  )
  useEffect(
    () => {
      if (clicked) {
        sound?.play()
      }
      else {
        sound?.pause()
      }
    }, [clicked]
  )

  return <>
    {/* this actually places the sound source (that makes the audio) into the scene
      in the right position */}
    {sound && <primitive object={sound} />}
    {/* this simply places the visuals in the scene */}
    {sound && <mesh 
      {...props}
      scale={1}
      visible={clicked ? true : false}
      rotation = {[Math.PI, 0, 0]}            
      
      onClick={() => setClicked(!clicked)}
    >
      <coneGeometry args={[Math.abs(Math.tan(sound.panner.coneInnerAngle) * sound.getMaxDistance()), sound.getMaxDistance(), 30]} />
      <meshPhongMaterial color='red' opacity={0.2} transparent={true}/>
    </mesh>}
  </>
}