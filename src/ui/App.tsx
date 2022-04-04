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
        {/* create-react-app default app */}
        <header className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className={styles.appLink}
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <button onClick={() => setLoop(curr => !curr)}>
            Loop?
          </button>
        </header>
      </div>
    </div>
  )
}




