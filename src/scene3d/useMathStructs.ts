import { useMemo } from 'react'
import { Euler, Quaternion, Vector2, Vector3 } from 'three'


// invariant references to once-per-mount allocated threejs math structures to
// be used in hooks and components

export const useVector2    = () => useMemo(() => new Vector2   (), [])
export const useVector3    = () => useMemo(() => new Vector3   (), [])
export const useEuler      = () => useMemo(() => new Euler     (), [])
export const useQuaternion = () => useMemo(() => new Quaternion(), [])

// triple buffered for react-three to notice state changes (why doesn't it work
// with double buffering? i don't know!)
export const useTBEuler = () => {
  const [buffers, indexBox] = useMemo(() => [
    [new Euler(), new Euler(), new Euler()],
    { current: 0 }
  ], [])
  const ret = buffers[indexBox.current]
  indexBox.current = (indexBox.current + 1) % buffers.length
  return ret
}
export const useTBVector3 = () => {
  const [buffers, indexBox] = useMemo(() => [
    [new Vector3(), new Vector3(), new Vector3()],
    { current: 0 }
  ], [])
  const ret = buffers[indexBox.current]
  indexBox.current = (indexBox.current + 1) % buffers.length
  return ret
}


