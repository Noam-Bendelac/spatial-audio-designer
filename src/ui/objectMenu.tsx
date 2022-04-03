import React, { useState } from "react";
// import { NavigateFunction, useNavigate } from "react-router-dom";
import { useForm } from "./useForm";



function objectMenu() {
    // defining the initial state for the form
    const initialState = {
        height: 5,
        width: 5,
    };

    // getting the event handlers from our custom hook
    const { onChange, onSubmit, values } = useForm(
        loginUserCallback,
        initialState
    );

    // a submit function that will execute upon form submission
    async function loginUserCallback() {
        // send "values" to database
    }

    return (
        // don't mind this ugly form :P
        <form onSubmit={onSubmit}>
        <div>
            <input
                name='height'
                id='email'
                type='email'
                placeholder='Email'
                onChange={onChange}
                required
                />

            <input
                name='width'
                id='password'
                type='password'
                placeholder='Password'
                onChange={onChange}
                required
                />
            <button type='submit'>Save Changes</button>
        </div>
        </form>
    );
}

export default objectMenu;