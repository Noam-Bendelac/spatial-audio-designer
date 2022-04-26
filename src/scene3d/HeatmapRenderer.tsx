import { useEffect, useMemo } from 'react'
import { Color, Group, Material, Mesh, ShaderMaterial, Vector3 } from 'three'
import * as model from 'model/model'
import { orientationYPToEuler } from 'model/math'
import { useEuler } from 'scene3d/useMathStructs'


const maxSoundSources = 15

type Uniforms = {
  numSoundSources: { value: number },
  soundSources: { value: SoundSourceUniform[] },
  gamma: { value: number },
}
type SoundSourceUniform = {
  position: Vector3,
  orientation: Vector3,
  coneInnerAngle: number,
  coneOuterAngle: number,
  coneOuterGain: number,
  refDistance: number,
  color: Color,
}

export const HeatmapRenderer = ({
  sceneGroup,
  soundSources,
  showHeatmap,
}: {
  sceneGroup: Group,
  soundSources: model.SoundSource[],
  showHeatmap: boolean,
}) => {
  // allocate uniforms memory once per mount
  const uniforms: Uniforms = useMemo(() => ({
    numSoundSources: { value: 0 },
    soundSources: { value: Array(maxSoundSources).fill(undefined).map<SoundSourceUniform>((_, idx) => ({
      position: new Vector3(),
      orientation: new Vector3(),
      coneInnerAngle: 0,
      coneOuterAngle: 0,
      coneOuterGain: 0,
      refDistance: 0,
      color: new Color(),
    })) },
    gamma: { value: 1.0 },
  }), [])
  
  const heatmapMaterial = useMemo(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
  }), [uniforms])
  useEffect(() => {
    // cleanup
    return () => { heatmapMaterial.dispose() }
  }, [heatmapMaterial])
  
  
  // every render, update uniform values
  uniforms.numSoundSources.value = min(maxSoundSources, soundSources.length)
  const eulerLocal = useEuler()
  uniforms.soundSources.value.forEach((soundSourceUniform, idx) => {
    // uniform soundSources beyond the number of scene soundSources are ignored,
    // no need to update them
    if (idx < soundSources.length) {
      const soundSource = soundSources[idx]
      
      soundSourceUniform.position.copy(soundSource.position)
      orientationYPToEuler(soundSource.orientation, eulerLocal)
      // rotate a unit vector by the orientation:
      soundSourceUniform.orientation.set(1, 0, 0).applyEuler(eulerLocal)
      
      soundSourceUniform.coneInnerAngle = soundSource.coneInnerAngle
      soundSourceUniform.coneOuterAngle = soundSource.coneOuterAngle
      soundSourceUniform.coneOuterGain = soundSource.coneOuterGain
      soundSourceUniform.refDistance = soundSource.refDistance
      
      soundSourceUniform.color.setHSL(idx / uniforms.numSoundSources.value, 0.98, 0.51)
    }
  })
  // TODO if structs in state are changed to mutable, add a useFrame updater
  
  
  // save the old, default materials to switch later
  const oldMaterials = useMemo(() => {
    const materialsMap = new Map<Mesh, Material | Material[]>()
    // for each node in the subtree:
    sceneGroup.traverse(node => {
      const mesh = node as Mesh
      if (!mesh.isMesh) return;
      // for each mesh...
      
      // save the old material for switching back
      materialsMap.set(mesh, mesh.material)
    })
    return materialsMap
  }, [sceneGroup])
  
  // apply the current material selection (heatmap vs original)
  useEffect(() => {
    sceneGroup.traverse(node => {
      const mesh = node as Mesh
      if (!mesh.isMesh) return;
      
      mesh.material = showHeatmap ? heatmapMaterial : oldMaterials.get(mesh)!
    })
  }, [showHeatmap, sceneGroup, oldMaterials, heatmapMaterial])
  
  return <primitive object={sceneGroup} />
}


const min = (a: number, b: number) => a < b ? a : b


const vertexShader = `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
struct SoundSource {
  vec3 position;
  // should be a unit vector
  vec3 orientation;
  float coneInnerAngle;
  float coneOuterAngle;
  float coneOuterGain;
  float refDistance;
  vec3 color;
};

uniform int numSoundSources;
uniform SoundSource soundSources[${maxSoundSources}];
uniform float gamma;

varying vec3 vWorldPosition;

float ilerp(float a, float b, float t) {
  return (t - a) / (b - a);
}

void main() {
  // cool colors
  // vec3 col = vWorldPosition / 10.0;
  // gl_FragColor = vec4(col, 1);
  
  vec3 sumOfColors = vec3(0,0,0);
  
  for (int i = 0; i < numSoundSources; i++) {
    SoundSource soundSource = soundSources[i];
    vec3 sourceToFrag = vWorldPosition - soundSource.position;
    float distToSource = length(sourceToFrag);
    // https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/distanceModel
    float rolloffFactor = 1.0;
    float refDist = soundSource.refDistance;
    float distanceCoeff = refDist / (refDist + rolloffFactor * (max(distToSource, refDist) - refDist));
    distanceCoeff = pow(distanceCoeff, 1.0 / 0.8);
    
    // to find angle away from source's axis:
    // dot product = mag1*mag2*cos(theta)
    vec3 sourceToFragUnit = sourceToFrag/distToSource;
    float dotProd = dot(soundSource.orientation, sourceToFragUnit);
    float theta = acos(dotProd);
    // theta is [0, pi]. we cannot tell apart left vs right and that's fine
    
    float innerAngle = radians(soundSource.coneInnerAngle) / 2.0;
    float outerAngle = radians(soundSource.coneOuterAngle) / 2.0;
    float angularCoeff = mix(
      1.0,
      soundSource.coneOuterGain,
      clamp(
        ilerp(innerAngle, outerAngle, theta),
        0.0,
        1.0
      )
    );
    
    sumOfColors += soundSource.color * (distanceCoeff * angularCoeff);
  }
  
  vec3 averageOfColors = sumOfColors / float(numSoundSources);
  vec3 adjustedColor = 3.5 * pow(averageOfColors, vec3(1.0/gamma));
  
  gl_FragColor = vec4(adjustedColor, 1);
}
`

