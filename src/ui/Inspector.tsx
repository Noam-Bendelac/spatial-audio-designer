import { Dispatch } from 'react'
import styles from './Inspector.module.css'
import * as model from 'model/model'
import produce from 'immer'
import classNames from 'classnames'



export const Inspector = ({
  onToggleCones,
  onToggleHeatmap,
  onToggleScene,
  onClickSave,
  selectedSoundIdx,
  selectedSound,
  onChange,
  className,
}: {
  onToggleCones: Dispatch<void>,
  onToggleHeatmap: Dispatch<void>,
  onToggleScene: Dispatch<void>,
  onClickSave: Dispatch<void>,
  selectedSoundIdx: number | null,
  selectedSound: model.SoundSource | undefined,
  onChange: Dispatch<model.SoundSource>,
  className?: string,
}) => {
  // switch between 3 vector references on each update for react-three to notice
  // the mutations
  // const newPos = useTBVector3()
  
  return <aside className={classNames(className, styles.main)}>
    <h1>
      Global Options
    </h1>
    <div className={styles.buttonsWrapper}>
      <button onClick={() => onToggleCones()}>Toggle audio field cone visualization</button>
      <button onClick={() => onToggleHeatmap()}>Toggle audio field heatmap visualization</button>
    </div>
    <div className={styles.buttonsWrapper}>
      <button onClick={() => onToggleScene()}>Toggle between scenes</button>
      <button onClick={() => onClickSave()}>Save current scene</button>
    </div>
    <p className={styles.item}>Audio files may take a minute to load, please be patient.</p>
    <h1>
      Controls
    </h1>
    <p className={styles.item}>Left Click - Select/Deselect Sound Source<br/>
    {/* <p className={styles.item}>Left Click + Drag - Rotate Camera</p> */}
    {/* <p className={styles.item}>Right Click + Drag - Translate/Move Camera</p> */}
    WASD - Walk<br/>
    R/F - Fly Up/Down<br/>
    Arrow keys - Rotate Camera</p>
    <p className={styles.item}>
      <a
        className={styles.item}
        href='https://github.com/Noam-Bendelac/hci-capstone'
        // new tab
        target="_blank" rel="noopener noreferrer"
      >GitHub Repo</a>
    </p>
    <div className={styles.spacer} />
    
    
    { selectedSoundIdx !== null && selectedSound && <>
      <h1>
        Sound Source Options
      </h1>
      <h2>{selectedSoundIdx + 1} - {selectedSound.name}</h2>
      <p className={styles.slider}>
        X:
        -5
        <input
          type='range'
          value={selectedSound?.position.x}
          title={selectedSound?.position.x.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.position = draft.position.clone().setX(Number.parseFloat(evt.target.value))
          }))}
          min='-5'
          max='5'
          step='0.2'
        />
        5
      </p>
      <p className={styles.slider}>
        Y:
        -5
        <input
          type='range'
          value={selectedSound?.position.y}
          title={selectedSound?.position.y.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.position = draft.position.clone().setY(Number.parseFloat(evt.target.value))
          }))}
          min='-5'
          max='5'
          step='0.2'
        />
        5
      </p>
      <p className={styles.slider}>
        Z:
        -5
        <input
          type='range'
          value={selectedSound?.position.z}
          title={selectedSound?.position.z.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.position = draft.position.clone().setZ(Number.parseFloat(evt.target.value))
          }))}
          min='-5'
          max='5'
          step='0.2'
        />
        5
      </p>
      <div className={styles.spacer} />
      
      
      <p className={styles.slider}>
        Yaw:
        -180
        <input
          type='range'
          value={selectedSound?.orientation.yaw}
          title={selectedSound?.orientation.yaw.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.orientation.yaw = Number.parseFloat(evt.target.value)
          }))}
          min='-180'
          max='180'
          step='1'
        />
        180
      </p>
      <p className={styles.slider}>
        Pitch:
        -90
        <input
          type='range'
          value={selectedSound?.orientation.pitch}
          title={selectedSound?.orientation.pitch.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.orientation.pitch = Number.parseFloat(evt.target.value)
          }))}
          min='-90'
          max='90'
          step='1'
        />
        90
      </p>
      <div className={styles.spacer} />
      
      
      <p className={styles.slider}>
        Cone inner angle:
        0
        <input
          type='range'
          value={selectedSound?.coneInnerAngle}
          title={selectedSound?.coneInnerAngle.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.coneInnerAngle = Number.parseFloat(evt.target.value)
          }))}
          min='0'
          max='360'
          step='1'
        />
        360
      </p>
      <p className={styles.slider}>
        Cone outer angle:
        0
        <input
          type='range'
          value={selectedSound?.coneOuterAngle}
          title={selectedSound?.coneOuterAngle.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.coneOuterAngle = Number.parseFloat(evt.target.value)
          }))}
          min='0'
          max='360'
          step='1'
        />
        360
      </p>
      <p className={styles.slider}>
        Cone outer level:
        0
        <input
          type='range'
          value={selectedSound?.coneOuterGain}
          title={selectedSound?.coneOuterGain.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.coneOuterGain = Number.parseFloat(evt.target.value)
          }))}
          min='0'
          max='1'
          step='.01'
        />
        1
      </p>
      <p className={styles.slider}>
        Cone attenuation distance:
        0
        <input
          type='range'
          value={selectedSound?.refDistance}
          title={selectedSound?.refDistance.toString()}
          onChange={evt => selectedSound && onChange(produce(selectedSound, draft => {
            draft.refDistance = Number.parseFloat(evt.target.value)
          }))}
          min='0'
          max='5'
          step='0.2'
        />
        5
      </p>
    </>}
  </aside>
}