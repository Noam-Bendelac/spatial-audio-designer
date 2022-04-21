import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import { Vector3 } from 'three'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)

  const [hideObjectMenu, setHideObjectMenu] = useState(false);
  const [hideSoundMenu, setHideSoundMenu] = useState(false);
  
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
    }],
  }))
  
  // eventually this will be the currently selected (clicked) scene element
  // const selectedElement = scene.object3Ds[0]
  const selectedSound = scene.soundSources[0]

  //
  const [inputValue, setInputValue] = useState<number>(0);
  
  return (
    <div className={styles.app}>
      <Scene scene={scene} loop={loop} className={styles.canvas} />

      <button className={styles.buttons} onClick={() => hideSoundMenu ? setHideSoundMenu(false) : setHideSoundMenu(true)}>Sound Source Menu</button>
      {/* sound menu */}
      <div className={hideSoundMenu ? styles.sidebar : styles.invisible}> {/**hideSoundMenu */}
        <header className={styles.title}>
          <p>
            Sound Options
          </p>
          <p className={styles.basic}>X:
            0<input defaultValue={selectedSound.position.x} min='0' max='100' type='range' placeholder='X' required/>100
          </p>
          <p className={styles.basic}>Y:
            <input defaultValue={selectedSound.position.y} type='range' placeholder='Y' required/>
          </p>
          <p className={styles.basic}>Z:
            <input defaultValue={selectedSound.position.z} type='range' placeholder='Z' required/>
          </p>
          <p className={styles.basic}>Yaw:
            <input defaultValue={selectedSound.orientation.yaw} type='range' placeholder='Yaw' required/>
          </p>
          <p className={styles.basic}>Pitch:
            <input defaultValue={selectedSound.orientation.pitch} type='range' placeholder='Pitch' required/>
          </p>
          <p className={styles.basic}>Inner Length:
            <input defaultValue={selectedSound.innerLength.valueOf()} type='range' placeholder='Roll' required/>
          </p>
          <p className={styles.basic}>Inner Width:
            <input defaultValue={selectedSound.innerWidth.valueOf()} type='range' placeholder='Roll' required/>
          </p>
          <p className={styles.basic}>Outer Length:
            <input defaultValue={selectedSound.outerLength.valueOf()} type='range' placeholder='Roll' required/>
          </p>
          <p className={styles.basic}>Outer Width:
            <input defaultValue={selectedSound.outerWidth.valueOf()} type='range' placeholder='Roll' required/>
          </p>
          <button onClick={() => setLoop(curr => !curr)}>
            Loop? (Temp)
          </button>
        </header> 
      </div>
      
      
    </div>
  )
}





