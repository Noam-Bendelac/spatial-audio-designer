import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import { Vector3 } from 'three'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)

  const [hideObjectMenu, setHideObjectMenu] = useState(true);
  
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
  
  // eventually this will be the currently selected (clicked) scene element
  const selectedElement = scene.object3Ds[0]
  
  return (
    <div className={styles.app}>
      <Scene loop={loop} className={styles.canvas} />
      <button onClick={() => hideObjectMenu ? setHideObjectMenu(false) : setHideObjectMenu(true)}>Object Menu</button>
      <div className={hideObjectMenu ? styles.sidebar : styles.invisible}>
        <header className={styles.title}>
          <p>
            Object Options
          </p>
          <p className={styles.basic}>X:
            <input defaultValue={selectedElement.position.x} type='number' placeholder='X' required/>
          </p>
          <p className={styles.basic}>Y:
            <input defaultValue={selectedElement.position.y} type='number' placeholder='Y' required/>
          </p>
          <p className={styles.basic}>Z:
            <input defaultValue={selectedElement.position.z} type='number' placeholder='Z' required/>
          </p>
          <p className={styles.basic}>Yaw:
            <input defaultValue={selectedElement.orientation.yaw} type='number' placeholder='Yaw' required/>
          </p>
          <p className={styles.basic}>Pitch:
            <input defaultValue={selectedElement.orientation.pitch} type='number' placeholder='Pitch' required/>
          </p>
          <p className={styles.basic}>Roll:
            <input defaultValue={selectedElement.orientation.roll} type='number' placeholder='Roll' required/>
          </p>
          <button onClick={() => setLoop(curr => !curr)}>
            Loop? (Temp)
          </button>
        </header> 
      </div>
      
    </div>
  )
}





