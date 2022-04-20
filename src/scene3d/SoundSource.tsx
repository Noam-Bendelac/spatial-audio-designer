import { useFrame } from '@react-three/fiber'
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
      {/* <mesh>
        <boxBufferGeometry />
        <meshBasicMaterial color={'green'} />
      </mesh> */}
      
      <PlaceholderSpeaker/>
      <AudioField position={[0, 0, 0]} />
      {/* other elements like gizmos go here, under the same transform */}
    </group>
  </Suspense>
}
