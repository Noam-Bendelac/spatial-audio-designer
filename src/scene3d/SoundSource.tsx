import * as model from 'model/model'
import { Suspense } from 'react'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { AudioField } from "scene3d/AudioField"
import { useTBEuler } from 'scene3d/useMathStructs'
import { orientationYPToEuler } from 'model/math'


export const SoundSource = ({ soundSource }: { soundSource: model.SoundSource }) => {
  const rotationEuler = useTBEuler()
  
  return <Suspense fallback={null}>
    <group
      position={soundSource.position}
      rotation={orientationYPToEuler(soundSource.orientation, rotationEuler)}
    >
      {/* this confirms that the speaker placeholder is positioned correctly at soundSource.position: */}
      {/* <mesh scale={0.1}>
        <boxBufferGeometry />
        <meshBasicMaterial color={'green'} />
      </mesh>
      <mesh position={[2,0,0]} scale={0.1}>
        <boxBufferGeometry />
        <meshBasicMaterial color={'green'} />
      </mesh> */}
      
      <PlaceholderSpeaker />
      <AudioField soundSource={soundSource} />
      {/* other elements like gizmos go here, under the same transform */}
    </group>
  </Suspense>
}
