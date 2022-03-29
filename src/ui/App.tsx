import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import { SceneState } from 'model/SceneState'
import logo from './logo.svg'
import './App.css'

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)
  
  const [scene, setScene] = useState<SceneState>(null!)
  
  return (
    <div className="App">
      <Scene loop={loop} className="canvas" />
      <div className="sidebar">
        {/* create-react-app default app */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
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




