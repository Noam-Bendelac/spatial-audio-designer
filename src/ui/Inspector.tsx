import { Dispatch, SetStateAction } from 'react'
import styles from './App.module.css'
import * as model from 'model/model'
import produce from 'immer'
import { useTBVector3 } from 'scene3d/useMathStructs'



export const Inspector = ({
  setLoop,
  selectedSound,
  onChange,
}: {
  setLoop: Dispatch<SetStateAction<boolean>>,
  selectedSound: model.SoundSource,
  onChange: Dispatch<model.SoundSource>,
}) => {
  // switch between 3 vector references on each update for react-three to notice
  // the mutations
  const newPos = useTBVector3()
  
  return <header className={styles.title}>
    <p>
      Sound Options
    </p>
    <p className={styles.basic}>
      X:
      -5
      <input
        type='range'
        value={selectedSound.position.x}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setX(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <p className={styles.basic}>
      Y:
      -5
      <input
        type='range'
        value={selectedSound.position.y}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setY(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <p className={styles.basic}>
      Z:
      -5
      <input
        type='range'
        value={selectedSound.position.z}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.position = newPos
            .copy(draft.position)
            .setZ(Number.parseFloat(evt.target.value))
        }))}
        min='-5'
        max='5'
        step='0.2'
      />
      5
    </p>
    <p className={styles.basic}>
      Yaw:
      -180
      <input
        type='range'
        value={selectedSound.orientation.yaw}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.orientation.yaw = Number.parseFloat(evt.target.value)
        }))}
        min='-180'
        max='180'
        step='1'
      />
      180
    </p>
    <p className={styles.basic}>
      Pitch:
      -90
      <input
        type='range'
        value={selectedSound.orientation.pitch}
        onChange={evt => onChange(produce(selectedSound, draft => {
          draft.orientation.pitch = Number.parseFloat(evt.target.value)
        }))}
        min='-90'
        max='90'
        step='1'
      />
      90
    </p>
    <p className={styles.basic}>Inner Length:
      <input defaultValue={selectedSound.innerLength} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.basic}>Inner Width:
      <input defaultValue={selectedSound.innerWidth} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.basic}>Outer Length:
      <input defaultValue={selectedSound.outerLength} type='range' placeholder='Roll' required/>
    </p>
    <p className={styles.basic}>Outer Width:
      <input defaultValue={selectedSound.outerWidth} type='range' placeholder='Roll' required/>
    </p>
    <button onClick={() => setLoop(curr => !curr)}>
      Loop? (Temp)
    </button>
  </header>
}