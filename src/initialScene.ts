import { audioFiles } from 'assets'
import * as model from 'model/model'
import { Vector3 } from 'three'



export const initialScenes: model.Scene[] = [
  // song with 13 tracks
  {
    "soundSources": [
      {
        "name": "Kick",
        "position": new Vector3(
          -1.6,
          0.8,
          1.6
        ),
        "orientation": {
          "yaw": 70,
          "pitch": 5
        },
        "coneInnerAngle": 80,
        "coneOuterAngle": 187,
        "coneOuterGain": 0,
        "refDistance": 2.6,
        "level": 1,
        "soundClip": audioFiles.song.track_1_Kick
      },
      {
        "name": "Snare",
        "position": new Vector3(
          0.4,
          0.8,
          1.4
        ),
        "orientation": {
          "yaw": 101,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 97,
        "coneOuterGain": 0,
        "refDistance": 3,
        "level": 1,
        "soundClip": audioFiles.song.track_2_Snare
      },
      {
        "name": "Clap",
        "position": new Vector3(
          1,
          0.8,
          -2
        ),
        "orientation": {
          "yaw": -119,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 66,
        "coneOuterGain": 0,
        "refDistance": 2.6,
        "level": 1,
        "soundClip": audioFiles.song.track_3_Clap
      },
      {
        "name": "Perc",
        "position": new Vector3(
          -1.4,
          0.8,
          -2.2
        ),
        "orientation": {
          "yaw": -79,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 89,
        "coneOuterGain": 0,
        "refDistance": 3,
        "level": 1,
        "soundClip": audioFiles.song.track_4_Perc
      },
      {
        "name": "Hat",
        "position": new Vector3(
          -0.8,
          0.8,
          1.6
        ),
        "orientation": {
          "yaw": 72,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 60,
        "coneOuterGain": 0,
        "refDistance": 3,
        "level": 1,
        "soundClip": audioFiles.song.track_5_Hat
      },
      {
        "name": "Cymbal",
        "position": new Vector3(
          2,
          0.5,
          1.4
        ),
        "orientation": {
          "yaw": 117,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 335,
        "coneOuterGain": 0,
        "refDistance": 1.4,
        "level": 1,
        "soundClip": audioFiles.song.track_6_Cymbal
      },
      {
        "name": "Bass",
        "position": new Vector3(
          5,
          0.4,
          -0.8
        ),
        "orientation": {
          "yaw": 180,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 91,
        "coneOuterGain": 0.24,
        "refDistance": 5,
        "level": 1,
        "soundClip": audioFiles.song.track_9_Bass
      },
      {
        "name": "Pad1",
        "position": new Vector3(
          -5,
          0.8,
          -1.8
        ),
        "orientation": {
          "yaw": -30,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 69,
        "coneOuterGain": 0,
        "refDistance": 0.6,
        "level": 1,
        "soundClip": audioFiles.song.track_10_Pad1
      },
      {
        "name": "Sub",
        "position": new Vector3(
          5,
          0.5,
          0
        ),
        "orientation": {
          "yaw": 168,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 174,
        "coneOuterGain": 0,
        "refDistance": 4.2,
        "level": 1,
        "soundClip": audioFiles.song.track_11_Sub
      },
      {
        "name": "Noise",
        "position": new Vector3(
          -5,
          1,
          -0.8
        ),
        "orientation": {
          "yaw": 0,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 60,
        "coneOuterGain": 0,
        "refDistance": 0.5,
        "level": 1,
        "soundClip": audioFiles.song.track_12_Noise
      },
      {
        "name": "Chimes",
        "position": new Vector3(
          -1,
          5,
          -3.6
        ),
        "orientation": {
          "yaw": -68,
          "pitch": -63
        },
        "coneInnerAngle": 76,
        "coneOuterAngle": 110,
        "coneOuterGain": 0,
        "refDistance": 3,
        "level": 1,
        "soundClip": audioFiles.song.track_13_Chimes
      },
      {
        "name": "Pad2",
        "position": new Vector3(
          -5,
          0.4,
          0.4
        ),
        "orientation": {
          "yaw": 21,
          "pitch": 7
        },
        "coneInnerAngle": 39,
        "coneOuterAngle": 73,
        "coneOuterGain": 0.05,
        "refDistance": 1.2,
        "level": 1,
        "soundClip": audioFiles.song.track_14_Pad2
      },
      {
        "name": "Pad3",
        "position": new Vector3(
          -4.8,
          0.8,
          1
        ),
        "orientation": {
          "yaw": 16,
          "pitch": 5
        },
        "coneInnerAngle": 30,
        "coneOuterAngle": 117,
        "coneOuterGain": 0,
        "refDistance": 0.4,
        "level": 1,
        "soundClip": audioFiles.song.track_15_Pad3
      }
    ]
  },
  // TARGET 2 sounds sources scene
  {
    soundSources: [{
      "name": "speaker 1",
      "position": new Vector3(
        3.4,
        0.8,
        -1.6
      ),
      "orientation": {
        "yaw": -92,
        "pitch": 0
      },
      "coneInnerAngle": 30,
      "coneOuterAngle": 50,
      "coneOuterGain": 0,
      "refDistance": 3,
      "level": 1,
      "soundClip": "/assets/melody.mp3"
    },
    {
      "name": "speaker 2",
      "position": new Vector3(
        -2,
        0.5,
        1
      ),
      "orientation": {
        "yaw": 83,
        "pitch": 5
      },
      "coneInnerAngle": 30,
      "coneOuterAngle": 150,
      "coneOuterGain": 0.2,
      "refDistance": 3,
      "level": 1,
      "soundClip": "/assets/melody.mp3"
    }]
  },
  // STARTING 2 sounds sources scene
  {
    soundSources: [{
      "name": "speaker 1",
      "position": new Vector3(
        2.4,
        2.0,
        -0.6
      ),
      "orientation": {
        "yaw": 92,
        "pitch": 0
      },
      "coneInnerAngle": 60,
      "coneOuterAngle": 120,
      "coneOuterGain": 0,
      "refDistance": 3,
      "level": 1,
      "soundClip": "/assets/melody.mp3"
    },
    {
      "name": "speaker 2",
      "position": new Vector3(
        -2,
        0.5,
        1
      ),
      "orientation": {
        "yaw": 83,
        "pitch": 25
      },
      "coneInnerAngle": 20,
      "coneOuterAngle": 40,
      "coneOuterGain": 0.2,
      "refDistance": 3,
      "level": 1,
      "soundClip": "/assets/melody.mp3"
    }]
  },
]

