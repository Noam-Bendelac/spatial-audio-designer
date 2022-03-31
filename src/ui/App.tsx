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




