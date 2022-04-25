import * as THREE from 'three'
import * as model from 'model/model'
import { useThree } from '@react-three/fiber'
import { useState, useEffect } from 'react'
import { deg2rad } from 'model/math'
import { DoubleSide } from 'three'



export const AudioField = ({
  soundSource,
  visible,
}: {
  soundSource: model.SoundSource,
  visible: boolean,
}) => {
  const maxLength = 20
  return <group
    scale={1}
    visible={visible}
  >
    <mesh
      position={[maxLength / 2, 0, 0]}
      rotation={[0, 0, Math.PI/2]}
    >
      <ConeAngleGeometry angle={soundSource.coneOuterAngle} height={maxLength} />
      <meshPhongMaterial color='red' opacity={0.08} transparent={true} side={DoubleSide} />
    </mesh>
    <mesh
      position={[soundSource.refDistance / 2, 0, 0]}
      rotation={[0, 0, Math.PI/2]}
    >
      <ConeAngleGeometry angle={soundSource.coneInnerAngle} height={soundSource.refDistance} />
      <meshPhongMaterial color='red' opacity={0.1} transparent={true} side={DoubleSide} />
    </mesh>
  </group>
}


const ConeAngleGeometry = ({
  angle,
  height,
}: {
  // degrees
  angle: number,
  height: number,
}) => {
  const halfAngleRad = deg2rad(angle/2)
  const radius = Math.abs(Math.tan(halfAngleRad) * height)
  // console.log({halfAngleRad, radius})
  return <coneGeometry
    args={[
      radius,
      height,
      30
    ]}
  />
}

