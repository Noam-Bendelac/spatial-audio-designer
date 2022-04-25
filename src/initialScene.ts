import { audioFiles } from 'assets'
import * as model from 'model/model'
import { Vector3 } from 'three'



export const initialScene: model.Scene = {
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
    level: 1,
    soundClip: audioFiles.melody,
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
    level: 1,
    soundClip: audioFiles.melody,
  }],
}