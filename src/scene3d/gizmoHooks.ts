

// const useTranslate = (position: Vector3, setPosition: Dispatch<Vector3>) => {

import { ThreeEvent, useThree } from '@react-three/fiber'
import { Dispatch, RefObject, useMemo, useRef, useState } from 'react'
import { Camera, Object3D, PerspectiveCamera, Ray, Raycaster, Vector2, Vector3 } from 'three'

/**
 * takes a ref to a threejs scene tree element whose position will be read and
 * modified when dragging the object onto which `onPointerMove` is attached
 * 
 * the translated position will also be sent to setPosition to set React state.
 * however, the reference identity of the Vector3 will be the same every time,
 * just mutated. the calling component must clone the vector to get react to
 * rerender (i think)
 * TODO currently only sent on PointerUp; may change this to on every drag
 * event, but we would need to throttle in the calling component
 * 
 * TODO must add direction input!
 */
export const useTranslate = (ref: RefObject<Object3D>, setPosition: Dispatch<Vector3>) => {
  // reactive state variables that should lead to react rerender
  const [dragging, setDragging] = useState(false)
  
  // nonreactive state variables that shouldn't lead to react rerender
  // these retain their meaning across calls to the functions that capture them
  const state = useRef({
    invariantPointerDistanceOnAxis: 0,
  }).current
  
  
  // nonreactive, non-state variables allocated here to avoid dynamic allocation
  // every frame. these don't retain their meaning across calls to the functions
  // that capture them, so they can be reused as local variables
  let { v2_0, v3_0, v3_1, v3_2, v3_3, v3_4, v3_5 } = useTranslate.locals
  
  const camera = useThree(state => state.camera) as PerspectiveCamera
  console.assert(camera instanceof PerspectiveCamera, "camera not PerspectiveCamera", camera)
  
  // event handlers to be returned
  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    setDragging(true)
    
    // pointer is just an alias to the once-per-mount-allocated Vector2 v2_0
    const pointer = getNDC(event.nativeEvent, v2_0)
    
    state.invariantPointerDistanceOnAxis = getPointerDistanceOnAxis(
      pointer, camera,
      ref.current!.getWorldPosition(v3_0), ref.current!.getWorldDirection(v3_1)
    )
  }
  const onPointerUp = (event: ThreeEvent<PointerEvent>) => {
    setDragging(false)
    // "hey react the position changed while you weren't looking"
    setPosition(ref.current!.position)
  }
  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (dragging) {
      const pointer = getNDC(event.nativeEvent, v2_0)
      
      // save world position and direction for multiple uses
      const currWorldPos = ref.current!.getWorldPosition(v3_0)
      const translateDir = ref.current!.getWorldDirection(v3_1)
      
      // the user is pointing to a new, slightly different point on the
      // translation axis
      const newPointerDistanceOnAxis = getPointerDistanceOnAxis(
        pointer, camera,
        currWorldPos, translateDir
      )
      
      // move the object so that the distance from the object to that point
      // stays the same as it was initially (invariantPointerDistanceOnAxis)
      // worldPosition += translateDir * (newPointerDistanceOnAxis - invariantPointerDistanceOnAxis)
      const newWorldPos = v3_2.addVectors(
        currWorldPos,
        v3_3.multiplyVectors(
          translateDir,
          v3_4.setScalar(newPointerDistanceOnAxis - state.invariantPointerDistanceOnAxis)
        )
      )
      
      // set local position to the necessary value to get a world position of newWorldPos
      ref.current!.position.copy(ref.current!.parent!.worldToLocal(v3_5.copy(newWorldPos)))
      
      // this should only be uncommented if the calling component throttles the event
      // setPosition(ref.current!.position)
    }
  }
  
  return {
    dragging,
    onPointerDown,
    onPointerUp,
    onPointerMove,
  }
}
// statically allocate the local variables for useTranslate
useTranslate.locals = {
  v2_0: new Vector2(),
  v3_0: new Vector3(),
  v3_1: new Vector3(),
  v3_2: new Vector3(),
  v3_3: new Vector3(),
  v3_4: new Vector3(),
  v3_5: new Vector3(),
}


/**
 * calculate pointer position in normalized device coordinates NDC (-1 to +1)
 * for both components
 * 
 * writes to outputVec and returns it; this is standard threejs convention to
 * avoid dynamic allocation
 */
const getNDC = (event: MouseEvent, outputVec: Vector2) => {
  // sanity checks on type info not provided by typescript / event info not documented in react-three
  console.assert(event.target instanceof HTMLElement, 'target is not HTMLElement', event.target)
  const target = event.target as HTMLElement
  console.assert(target.tagName === 'CANVAS', 'target is not canvas', target)
  console.assert((event.currentTarget as HTMLElement).tagName === 'CANVAS', 'current target is not canvas', target)
  console.assert(target === event.currentTarget, 'target !== currentTarget')
  
  outputVec.x =   (event.offsetX / target.offsetWidth ) * 2 - 1
  outputVec.y = - (event.offsetY / target.offsetHeight) * 2 + 1
  
  return outputVec
}


// calculate where along the axis the user's pointer is pointing, relative to an
// origin position on that axis
const getPointerDistanceOnAxis = (
  pointer: Vector2, camera: PerspectiveCamera,
  axisOrigin: Vector3, axisDirection: Vector3
) => {
  const {
    raycaster, axisRay,
    v3_0, v3_1, v3_2, v3_3, v3_4
  } = getPointerDistanceOnAxis.locals
  
  // line along which the user is pointing in 3d space
  raycaster.setFromCamera(pointer, camera)
  
  console.assert(Math.abs(raycaster.ray.direction.length() - 1) < 0.1, 'raycaster ray is not unit', raycaster)
  
  // turn the raycaster into a line segment (a pair of Vector3-s) consisting of
  // the near point and the far point.
  // this is so we can use Ray#distanceSqToSegment with the axis on this line segment
  // the raycaster's near and far are 0 and Infinity for some reason, so we use
  // the camera's.
  
  // start = camera.position + camera.near * raycaster.ray.direction
  // end   = camera.position + camera.far  * raycaster.ray.direction
  const pointingLineStart = v3_0.addVectors(
    camera.position,
    v3_2.multiplyVectors(
      raycaster.ray.direction,
      v3_3.setScalar(camera.near)
    )
  )
  const pointingLineEnd = v3_1.addVectors(
    camera.position,
    v3_2.multiplyVectors(
      raycaster.ray.direction,
      v3_3.setScalar(camera.far)
    )
  )
  
  // make a Ray of the axis 
  axisRay.set(axisOrigin, axisDirection)
  
  // alias to static allocation
  const closestPointOnAxis = v3_4
  // this will calculate the closest point between the axis and the pointing line
  // segment, and store that point in closestPointOnAxis (we ignore the return value)
  axisRay.distanceSqToSegment(pointingLineStart, pointingLineEnd, closestPointOnAxis)
  
  const pointerDistanceOnAxis = axisOrigin.distanceTo(closestPointOnAxis)
  return pointerDistanceOnAxis
}
// statically allocate the local variables for getPointerDistanceOnAxis
getPointerDistanceOnAxis.locals = {
  raycaster: new Raycaster(),
  axisRay: new Ray(),
  // temporaries for calculations
  v3_0: new Vector3(),
  v3_1: new Vector3(),
  v3_2: new Vector3(),
  v3_3: new Vector3(),
  v3_4: new Vector3(),
}

