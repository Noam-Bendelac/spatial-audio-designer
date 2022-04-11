import { useFrame } from '@react-three/fiber'
import * as model from 'model/model'
import { Suspense, useRef } from 'react'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { Group } from 'three'



export const SoundSource = ({ soundSource }: { soundSource: model.SoundSource }) => {
  // just for testing
  const ref = useRef<Group | null>(null)
  useFrame(() => {
    if (ref.current != null) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.01
    }
  })
  
  return <Suspense fallback={null}>
    <group ref={ref} position={soundSource.position}>
      <PlaceholderSpeaker />
      {/* other elements like gizmos go here, under the same transform */}
    </group>
  </Suspense>
}
