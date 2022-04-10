import { Vector3 } from 'three'

// it is recommended to import this file as `import * as model from '...model'
// to avoid name conflicts

// these types are readonly to mark state mutation as an error. in react you
// update state by constructing new state that shares pieces of the old state
// (structural sharing)


// top level scene description
// this is the data that would be exported to, for example, X3D
// it does not include all application state, such as editing camera location
export interface Scene {
  readonly soundSources: SoundSource[],
  readonly viewerCameraStart: DOF5,
}

export interface SoundSource extends DOF5 {
  readonly name: string,
  
  // TODO this is for X3D Sound node (ellipsoid), change to web audio cone-based
  // spatialized source
  readonly outerLength: Number,
  readonly outerWidth: Number,
  readonly innerLength: Number,
  readonly innerWidth: Number,
  
  // filename of asset; TODO might change
  readonly soundClip: string | null,
  readonly level: Number,
  readonly speed: Number,
  readonly start: Number,
  readonly stop: Number,
  readonly convolution: ConvolutionSpace,
}

// TODO add more
type ConvolutionSpace =
  | 'none'
  | 'cathedral'




// 6 degrees of freedom
export interface DOF6 {
  // 3D coordinate
  readonly position: Vector3,
  // pitch, yaw, roll
  readonly orientation: OrientationYPR,
}

// 5 degrees of freedom, for things that can't rotate about their direction ray:
export interface DOF5 {
  // 3D coordinate
  readonly position: Vector3,
  // pitch, yaw
  readonly orientation: OrientationYP,
}


export interface OrientationYPR {
  // turn left-right
  readonly yaw: number,
  // turn up-down
  readonly pitch: number,
  // turn about the direction you're facing
  readonly roll: number,
}

export interface OrientationYP {
  // turn left-right
  readonly yaw: number,
  // turn up-down
  readonly pitch: number,
}
