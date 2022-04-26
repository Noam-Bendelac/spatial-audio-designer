import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { speaker } from 'assets'
import { GroupProps, useLoader } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Group, Mesh, MeshPhongMaterial } from 'three'


// due to the way the useLoader hook works, it seems this component suspends and
// must have a <Suspense> *outside* this component
export const PlaceholderSpeaker = ({
  selected,
  ...props
}: (
  {selected: boolean} & GroupProps
)) => {
  // useLoader returns the *same Group instance* for all components if they pass
  // in the same url
  const sourceObj = useLoader(OBJLoader, speaker)
  // to mount multiple times in different places in the threejs scene, we must
  // clone. Because useLoader returns a Group instance we don't directly use,
  // this is technically slightly wasteful, but clone is relatively cheap because
  // it does not duplicate memory intensive resources (mainly the geometry)
  // https://stackoverflow.com/questions/41638745/how-does-the-clone-method-in-three-js-save-memory
  const obj = useMemo(() => {
    const group = sourceObj.clone()
    
    // also clone the materials so each PlaceholderSpeaker instance can have a different color
    // these type assumptions (`as ...`) are only valid for the speaker.obj file
    const mesh = group.children[0] as Mesh
    const mats = mesh.material as MeshPhongMaterial[]
    mesh.material = mats.map(mat => mat.clone())
    return group
  }, [sourceObj])
  
  // test to color each part of the mesh a different material
  useEffect(() => {
    const group: Group = obj
    // these type assumptions (`as ...`) are only valid for the speaker.obj file
    const mesh = group.children[0] as Mesh
    const mats = mesh.material as MeshPhongMaterial[]
    // fill each material with a different color for testing
    const colors: [number, number, number][] = [[0.2,0.2,0.2], [0.1, 0.102, 0.106]]
    mats.forEach((mat, idx) => {
      const color = colors[idx%colors.length]
      mat.color.setRGB(...color).multiplyScalar(selected ? 2.5 : 1)
    })
  }, [obj, selected])
  
  return <group
    scale={.003}
    // by default, the speaker.obj model faces +y; make it face +x:
    rotation={[0, 0, -Math.PI/2]}
    {...props}
  >
    <primitive
      object={obj}
      // object={newMesh}
    />
  </group>
}
