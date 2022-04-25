import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import styles from './App.module.css'
import { Inspector } from 'ui/Inspector'
import { useImmer } from 'use-immer'
import { initialScene } from 'initialScene'

export const App = () => {
  // the webaudio api won't allow the app to play audio if the user hasn't
  // interacted with the page first: https://developer.chrome.com/blog/autoplay/#web-audio
  // this is to prevent intrusive autoplay
  const [started, setStarted] = useState(false)
  
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)

  // placeholder initial scene
  const [scene, setScene] = useImmer<model.Scene>(initialScene)
  
  // eventually this will be the currently selected (clicked) scene element
  // const selectedElement = scene.object3Ds[0]
  const selectedSound = scene.soundSources[0]

  //
  
  return (
    <div className={styles.app}>
      { started
      ? <Scene scene={scene} loop={loop} className={styles.canvas} />
      : <div
          className={styles.canvas}
          onClick={() => setStarted(true)}
        >Click to load app</div>
      }
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





