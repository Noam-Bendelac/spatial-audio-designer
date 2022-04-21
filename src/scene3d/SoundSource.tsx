import * as model from 'model/model'
import { Suspense, useRef } from 'react'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { Group } from 'three'
import { AudioField } from "scene3d/AudioField"


export const SoundSource = ({ soundSource }: { soundSource: model.SoundSource }) => {
  // just for testing
  const ref = useRef<Group | null>(null)
  return <Suspense fallback={null}>
    <group ref={ref} position={soundSource.position}>
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
