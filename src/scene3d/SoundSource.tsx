import { useFrame } from '@react-three/fiber'
import * as model from 'model/model'
import { Suspense, useRef } from 'react'
import { useTranslate } from 'scene3d/gizmoHooks'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { Group } from 'three'



export const SoundSource = ({ soundSource }: { soundSource: model.SoundSource }) => {
  // just for testing
  const ref = useRef<Group>(null)
  // useFrame(() => {
  //   if (ref.current != null) {
  //     ref.current.rotation.x += 0.01
  //     ref.current.rotation.y += 0.01
  //   }
  // })
  
  const { dragging, onPointerDown, onPointerUp, onPointerMove } = useTranslate(ref, console.log)
    
  return <Suspense fallback={null}>
    <group ref={ref} position={soundSource.position}>
      <PlaceholderSpeaker />
      {/* other elements like gizmos go here, under the same transform */}
      <mesh
        position={[0, 0, 5]}
        rotation={[Math.PI / 2, 0, 0]}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
      >
        <cylinderGeometry args={[.25, .25, 1, 20, 1]} />
        <meshStandardMaterial color={dragging ? 'hotpink' : 'orange'} />
      </mesh>
    </group>
  </Suspense>
}
