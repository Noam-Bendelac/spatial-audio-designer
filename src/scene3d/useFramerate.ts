import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { Clock } from 'three'





export const useLogFramerate = () => {
  const state = useMemo(() => ({
    clock: new Clock(),
    queue: Array(10).fill(0),
    idx: 0,
    sum: 0,
  }), [])
  const { queue, clock } = state
  
  useFrame(() => {
    state.sum -= queue[state.idx]
    const delta = clock.getDelta()
    queue[state.idx] = 1/(delta ? delta : 1)
    state.sum += queue[state.idx]
    state.idx = (state.idx + 1) % 10
    console.log(state.sum / 10)
  })
}


export const useLimitFramerate = (loop: boolean) => {
  const invalidate = useThree(state => state.invalidate)
  
  useEffect(() => {
    // source: https://stackoverflow.com/a/51942991
    const clock = new Clock()
    let delta = 0
    const fps = 30
    
    const mutableId: { id?: number } = { }
    const render = () => {
      mutableId.id = requestAnimationFrame(render)
      
      delta += clock.getDelta()
      if ((delta > 1/fps) && loop && document.hasFocus()) {
        invalidate()
        delta = delta % (1/fps)
      }
    }
    mutableId.id = requestAnimationFrame(render)
    
    return () => { mutableId.id !== undefined && cancelAnimationFrame(mutableId.id) }
  }, [invalidate, loop])
}