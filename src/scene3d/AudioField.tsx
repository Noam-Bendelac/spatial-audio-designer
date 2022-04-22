import * as THREE from 'three'
import * as model from 'model/model'
import { useThree } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { deg2rad } from 'model/math'



export const AudioField = ({ soundSource }: { soundSource: model.SoundSource }) => {
  const { camera } = useThree();
  const [clicked, setClicked] = useState(false)
  const [sound, setSound] = useState<THREE.PositionalAudio | null>(null)

  useEffect(
    () => {
      const listener = new THREE.AudioListener()
      camera.add(listener)    
      const soundObject = new THREE.PositionalAudio(listener)
      soundObject.setRefDistance(soundSource.refDistance)
      soundObject.setVolume(.2)
      soundObject.setDirectionalCone(soundSource.coneInnerAngle, soundSource.coneOuterAngle, soundSource.coneOuterGain)
      soundObject.setMaxDistance(soundSource.maxDistance)
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
    {sound && <group rotation={[0, Math.PI/2, 0]}>
      <primitive object={sound} />
    </group>}
    {/* this simply places the visuals in the scene */}
    {sound && <mesh
      scale={1}
      visible={clicked ? true : false}
      rotation={[0, 0, Math.PI/2]}
      position={[soundSource.maxDistance / 2, 0, 0]}
      onClick={() => setClicked(!clicked)}
    >
      <ConeAngleGeometry angle={soundSource.coneInnerAngle} height={soundSource.maxDistance} />
      <meshPhongMaterial color='red' opacity={0.2} transparent={true}/>
    </mesh>}
  </>
}


const ConeAngleGeometry = ({
  angle,
  height,
}: {
  // degrees
  angle: number,
  height: number,
}) => {
  const halfAngleRad = deg2rad(angle/2)
  const radius = Math.abs(Math.tan(halfAngleRad) * height)
  // console.log({halfAngleRad, radius})
  return <coneGeometry
    args={[
      radius,
      height,
      30
    ]}
  />
}

