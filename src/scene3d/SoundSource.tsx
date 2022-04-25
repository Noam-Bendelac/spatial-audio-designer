import * as model from 'model/model'
import { Suspense, useCallback, useContext, useEffect, useState } from 'react'
import { PlaceholderSpeaker } from 'scene3d/PlaceholderSpeaker'
import { AudioField } from "scene3d/AudioField"
import { useTBEuler } from 'scene3d/useMathStructs'
import { orientationYPToEuler } from 'model/math'
import { listenerContext } from 'scene3d/listenerContext'
import { PositionalAudio } from 'three'


export const SoundSource = ({
  soundSource,
  audioBuffer,
  play,
}: {
  soundSource: model.SoundSource,
  audioBuffer: AudioBuffer | null,
  play: boolean,
}) => {
  const [showField, setShowField] = useState(false)
  
  const rotationEuler = useTBEuler()
  
  const listener = useContext(listenerContext)
  
  const positionalAudioRef = useCallback((node: PositionalAudio | null) => {
    if (node !== null) { setPositionalAudio(node) }
  }, [])
  const [positionalAudio, setPositionalAudio] = useState<PositionalAudio | null>(null)
  useEffect(() => {
    positionalAudio?.setDirectionalCone(soundSource.coneInnerAngle, soundSource.coneOuterAngle, soundSource.coneOuterGain)
    positionalAudio?.setRefDistance(soundSource.refDistance)
    positionalAudio?.setMaxDistance(soundSource.maxDistance)
    positionalAudio?.setVolume(.2)
  }, [positionalAudio, soundSource])
  
  useEffect(() => {
    if (play) {
      if (audioBuffer) {
        positionalAudio?.setBuffer(audioBuffer) // TODO resets position?
        positionalAudio?.play()
      }
    } else {
      positionalAudio?.pause()
    }
  }, [positionalAudio, play, audioBuffer])
  
  return <Suspense fallback={null}>
    <group
      position={soundSource.position}
      rotation={orientationYPToEuler(soundSource.orientation, rotationEuler)}
    >
      <PlaceholderSpeaker onClick={() => setShowField(curr => !curr)} />
      <positionalAudio
        args={[listener]}
        ref={positionalAudioRef}
        rotation={[0, Math.PI/2, 0]}
      />
      <AudioField soundSource={soundSource} visible={showField} />
      {/* other elements like gizmos go here, under the same transform */}
    </group>
  </Suspense>
}
