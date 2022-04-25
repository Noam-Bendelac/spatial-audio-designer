import { audioFiles } from 'assets'
import * as model from 'model/model'
import { Vector3 } from 'three'



export const initialScene: model.Scene = {
  viewerCameraStart: {
    position: new Vector3(0, 0, 0),
    orientation: {
      yaw: 0,
      pitch: 0,
    },
  },
  soundSources: [{
    name: 'speaker 1',
    position: new Vector3(2,0.5,1),
    orientation: {
      yaw: 70,
      pitch: 30,
    },
    coneInnerAngle: 70,
    coneOuterAngle: 90,
    coneOuterGain: 0,
    refDistance: 5,
    maxDistance: 15,
    level: 1,
    soundClip: audioFiles.melody,
    speed: 1,
    start: 0,
    stop: 1,
    convolution: 'none',
  }, {
    name: 'speaker 2',
    position: new Vector3(-2,0.5,-1),
    orientation: {
      yaw: -70,
      pitch: 45,
    },
    coneInnerAngle: 30,
    coneOuterAngle: 60,
    coneOuterGain: 0,
    refDistance: 3,
    maxDistance: 15,
    level: 1,
    soundClip: audioFiles.melody,
    speed: 1,
    start: 0,
    stop: 1,
    convolution: 'none',
  }],
}