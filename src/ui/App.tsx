import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import * as React from 'react';
import objectMenu from './objectMenu'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)
  
  const [scene, setScene] = useState<model.Scene>(null!)
  
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




