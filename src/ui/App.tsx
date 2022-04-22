import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import { Vector3 } from 'three'
import { Inspector } from 'ui/Inspector'
import { useImmer } from 'use-immer'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)

  // placeholder initial scene
  const [scene, setScene] = useImmer<model.Scene>(() => ({
    viewerCameraStart: {
      position: new Vector3(0, 0, 0),
      orientation: {
        yaw: 0,
        pitch: 0,
      },
    },
    object3Ds: [{
      name: 'object 1',
      position: new Vector3(5,5,-20),
      orientation: {
        yaw: 0,
        pitch: 0,
        roll: 0,
      },
      mesh: null,
    }],
    soundSources: [{
      name: 'speaker 1',
      position: new Vector3(0,1,0),
      orientation: {
        yaw: 0,
        pitch: 0,
      },
      innerLength: 2,
      innerWidth: 0,
      outerLength: 0,
      outerWidth: 0,
      level: 1,
      soundClip: null,
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
      innerLength: 2,
      innerWidth: 0,
      outerLength: 0,
      outerWidth: 0,
      level: 1,
      soundClip: null,
      speed: 1,
      start: 0,
      stop: 1,
      convolution: 'none',
    }],
  }))
  
  // eventually this will be the currently selected (clicked) scene element
  // const selectedElement = scene.object3Ds[0]
  const selectedSound = scene.soundSources[0]

  //
  
  return (
    <div className={styles.app}>
      <Scene scene={scene} loop={loop} className={styles.canvas} />

      {/* sound menu */}
      <div className={styles.sidebar}>
        <Inspector
          setLoop={setLoop}
          selectedSound={selectedSound}
          onChange={newSoundSource => setScene(draft => {
            draft.soundSources[0] = newSoundSource
          })}
        />
      </div>
      
      
    </div>
  )
}





