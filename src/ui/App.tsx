import { useState } from 'react'
import { Scene } from 'scene3d/Scene'
import * as model from 'model/model'
import logo from './logo.svg'
import styles from './App.module.css'
import * as React from 'react';
import objectMenu from './objectMenu'
import { useForm } from "react-hook-form";

export const App = () => {
  // pause looping during development for performance
  const [loop, setLoop] = useState(true)
  
  const [scene, setScene] = useState<model.Scene>(null!)

  //testing shit
  const { register, watch, formState: { errors } } = useForm();
  const [hideObjectMenu, setHideObjectMenu] = useState(true);
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
  return (
    <div className={styles.app}>
      <Scene loop={loop} className={styles.canvas} />
      <button onClick={() => hideObjectMenu ? setHideObjectMenu(false) : setHideObjectMenu(true)}>Show Object Menu</button>
      <div className={hideObjectMenu ? styles.sidebar : styles.invisible}>
        <header className={styles.title}> Object Options:
        <form>
          {/* register your input into the hook by invoking the "register" function */}
          <p className={styles.basic}>
            Test Value 1:
            <input type="number" {...register("example")} />
          </p>
          <p className={styles.basic}>
            Test Value 2:
            <input type="number" {...register("example")} />
          </p>
          <p className={styles.basic}>
            Test Value 3:
            <input type="number" {...register("example")} />
          </p>
          {errors.exampleRequired && <span>This field is required</span>}        
        </form>
          <button onClick={() => setLoop(curr => !curr)}>
            Loop? (Temp)
          </button>
        </header> 
      </div>
      
    </div>
  )
}




