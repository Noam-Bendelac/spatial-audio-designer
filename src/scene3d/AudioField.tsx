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
}) => <mesh
    scale={1}
    visible={visible}
    rotation={[0, 0, Math.PI/2]}
    position={[soundSource.maxDistance / 2, 0, 0]}
  >
    <ConeAngleGeometry angle={soundSource.coneInnerAngle} height={soundSource.maxDistance} />
    <meshPhongMaterial color='red' opacity={0.15} transparent={true} side={DoubleSide} />
  </mesh>


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

