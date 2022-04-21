import { OrientationYP, OrientationYPR } from 'model/model'
import { Euler, Quaternion } from 'three'

/**
 * Euler uses intrinsic XYZ order by default; trying to change this order didn't
 * seem to work, possibly because of react-three. So, we do YZX order
 * manually. yaw, pitch, roll = y, z, x
 */
export const orientationYPToEuler = (orientation: OrientationYP, target: Euler): Euler => {
  target.set(
    // don't rotate x
    0,
    // then, rotating about y does yaw
    deg2rad(orientation.yaw),
    // then, rotating about z does pitch
    deg2rad(orientation.pitch)
  )
  set.add(target)
  console.log(set)
  return target
}
const set = new Set()

export const orientationYPRToEuler = (orientation: OrientationYPR, target: Euler): Euler => {
  const { q1, q2, e1 } = orientationYPRToEuler.locals
  // rotate y for yaw then z for pitch
  q1.setFromEuler(e1.set(
    0,
    deg2rad(orientation.yaw),
    deg2rad(orientation.pitch
  )))
  // then x for roll
  q2.setFromEuler(e1.set(
    deg2rad(orientation.roll),
    0,
    0
  ))
  q1.multiply(q2)
  target.setFromQuaternion(q1)
  return target
}
orientationYPRToEuler.locals = {
  q1: new Quaternion(),
  q2: new Quaternion(),
  e1: new Euler(),
}

export const deg2rad = (deg: number) => deg / 180 * Math.PI
export const rad2deg = (rad: number) => rad * 180 / Math.PI
