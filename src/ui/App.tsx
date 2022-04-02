import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'

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
          <button onClick={() => setLoop(curr => !curr)}>
            Loop? (Temp)
          </button>
        </header>
      </div>
      
    </div>
  )
}




