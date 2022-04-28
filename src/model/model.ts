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
}

export interface SoundSource extends DOF5 {
  readonly name: string,
  
  // spatialized source
  // in degrees
  readonly coneInnerAngle: number,
  readonly coneOuterAngle: number,
  // linear amplitude at edge/outside cone
  readonly coneOuterGain: number,
  // distance used for distance attenuation; sound diminishes but can still be
  // heard beyond this distance
  readonly refDistance: number,
  
  // filename of asset; TODO might change
  readonly soundClip: string | null,
  readonly level: number,
}




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


// all orientation angles are in degrees
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
