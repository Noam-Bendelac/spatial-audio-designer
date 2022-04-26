import { audioFiles } from 'assets'
import * as model from 'model/model'
import { Vector3 } from 'three'



export const initialScenes: model.Scene[] = [
  // song with 13 tracks
  {
    soundSources: [{
      name: 'Kick',
      position: new Vector3(2,0.5,1),
      orientation: {
        yaw: 70,
        pitch: 5,
      },
      coneInnerAngle: 70,
      coneOuterAngle: 90,
      coneOuterGain: 0,
      refDistance: 5,
      level: 1,
      soundClip: audioFiles.song.track_1_Kick,
    }, {
      name: 'Snare',
      position: new Vector3(4,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_2_Snare,
    }, {
      name: 'Clap',
      position: new Vector3(3.5,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_3_Clap,
    }, {
      name: 'Perc',
      position: new Vector3(3,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_4_Perc,
    }, {
      name: 'Hat',
      position: new Vector3(2.5,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_5_Hat,
    }, {
      name: 'Cymbal',
      position: new Vector3(2,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_6_Cymbal,
    }, {
      name: 'Bass',
      position: new Vector3(1.5,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_9_Bass,
    }, {
      name: 'Pad1',
      position: new Vector3(1,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_10_Pad1,
    }, {
      name: 'Sub',
      position: new Vector3(0.5,0.5,1),
      orientation: {
        yaw: -180,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_11_Sub,
    }, {
      name: 'Noise',
      position: new Vector3(-0.5,0.5,1),
      orientation: {
        yaw: 0,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_12_Noise,
    }, {
      name: 'Chimes',
      position: new Vector3(-1,0.5,1),
      orientation: {
        yaw: 0,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_13_Chimes,
    }, {
      name: 'Pad2',
      position: new Vector3(-1.5,0.5,1),
      orientation: {
        yaw: 0,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_14_Pad2,
    }, {
      name: 'Pad3',
      position: new Vector3(-2,0.5,1),
      orientation: {
        yaw: 0,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 60,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.song.track_15_Pad3,
    }],
  },
  // melody with 2 sounds sources scene
  {
    soundSources: [{
      name: 'speaker 1',
      position: new Vector3(2,0.5,1),
      orientation: {
        yaw: 70,
        pitch: 25,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 90,
      coneOuterGain: 0,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.melody,
    }, {
      name: 'speaker 2',
      position: new Vector3(-2,0.5,-1),
      orientation: {
        yaw: -70,
        pitch: 5,
      },
      coneInnerAngle: 30,
      coneOuterAngle: 90,
      coneOuterGain: 0.2,
      refDistance: 3,
      level: 1,
      soundClip: audioFiles.melody,
    }]
  },
]

