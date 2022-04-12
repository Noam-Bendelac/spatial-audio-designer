import { useFrame } from '@react-three/fiber'
import * as model from 'model/model'
import { Suspense, useRef } from 'react'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { Group } from 'three'
import { AudioField } from "scene3d/Scene"


export const SoundSource = ({ soundSource }: { soundSource: model.SoundSource }) => {
  // just for testing
  const ref = useRef<Group | null>(null)
  useFrame(() => {
    if (ref.current != null) {
    //   ref.current.rotation.x += 0.005
    //   ref.current.rotation.y += 0.005
    }
  })
  
  return <Suspense fallback={null}>
    <group ref={ref} position={soundSource.position}>
      <PlaceholderSpeaker position={[0, 10, 0]}/>
      <AudioField position={[0, 6, 0]} />
      {/* other elements like gizmos go here, under the same transform */}
    </group>
  </Suspense>
}
