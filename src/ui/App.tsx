import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import { Vector3 } from 'three'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)
  
  // placeholder initial scene
  const [scene, setScene] = useState<model.Scene>(() => ({
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
      position: new Vector3(-5,-5,-20),
      orientation: {
        yaw: 0,
        pitch: 0,
      },
      innerLength: 0,
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
  
  return (
    <div className={styles.app}>
      <Scene loop={loop} className={styles.canvas} />
      <div className={styles.sidebar}>
        <header className={styles.title}>
          <p>
            Object Options
          </p>
          <p className={styles.basic}>X:
            <input name='x' id='x' type='number' placeholder='X' required/>
          </p>
          <p className={styles.basic}>Y:
            <input name='y' id='y' type='number' placeholder='Y' required/>
          </p>
          <p className={styles.basic}>Z:
            <input name='z' id='z' type='number' placeholder='Z' required/>
          </p>
          <p className={styles.basic}>Yaw:
            <input name='yaw' id='yaw' type='number' placeholder='Yaw' required/>
          </p>
          <p className={styles.basic}>Pitch:
            <input name='pitch' id='pitch' type='number' placeholder='Pitch' required/>
          </p>
          <p className={styles.basic}>Roll:
            <input name='roll' id='roll' type='number' placeholder='Roll' required/>
          </p>
          <button>
            Save Changes
          </button>
          <button onClick={() => setLoop(curr => !curr)}>
            Loop? (Temp)
          </button>
        </header> 
      </div>
      
    </div>
  )
}




