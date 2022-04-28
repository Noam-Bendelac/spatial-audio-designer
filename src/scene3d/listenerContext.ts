import { createContext } from 'react'
import { AudioListener } from 'three'



export const listenerContext = createContext<AudioListener>(null!)