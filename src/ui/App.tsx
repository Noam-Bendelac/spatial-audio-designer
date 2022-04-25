import { useCallback, useState } from 'react'
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
  
  const onClickSave = useOnClickSave(scene)
  
  // eventually this will be the currently selected (clicked) scene element
  // const selectedElement = scene.object3Ds[0]
  const selectedSound = scene.soundSources[0]

  //
  
  return (
    <div className={styles.app}>
      { started
      ? <Scene scene={scene} loop={loop} className={styles.canvas} />
      : <div
          className={styles.loadingWrapper}
          onClick={() => setStarted(true)}
        ><p className={styles.loading}>Click to load app</p></div>
      }
      {/* sound menu */}
      <Inspector
        className={styles.sidebar}
        onClickSave={onClickSave}
        selectedSound={selectedSound}
        onChange={newSoundSource => setScene(draft => {
          draft.soundSources[0] = newSoundSource
        })}
      />
      
      
    </div>
  )
}


const useOnClickSave = (scene: model.Scene) => {
  const onClickSave = useCallback(() => {
    const textContent = JSON.stringify(scene, undefined, 2)
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    
    // reference https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
    const a = document.createElement('a')
    const filename = `scene-${currTimeForFilename()}.json`
    a.download = filename
    a.rel = 'noopener'
    a.href = URL.createObjectURL(blob)
    a.click()
    setTimeout(() => { URL.revokeObjectURL(a.href) }, 0)
  }, [scene])
  
  return onClickSave
}

const currTimeForFilename = () => {
  // creates a filename-safe string for the current time
  // https://stackoverflow.com/questions/44484882/download-with-current-user-time-as-filename
  const now = new Date();
  const y = now.getFullYear();
  // JavaScript months are 0-based.
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const h = now.getHours();
  const mi = now.getMinutes();
  const s = now.getSeconds();
  return `${y}-${m}-${d}-${h}-${mi}-${s}`;
}





