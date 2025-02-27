import { createSlice } from "@reduxjs/toolkit";



const pause = JSON.parse(localStorage.getItem("histPauseData")) || false

const pauseHistSlice = createSlice({
    name:"PauseData",
    initialState:pause,
    reducers:{
        pauseHistDataReducer : (state,action)=>{
    if (state === false){
const newState = true
        localStorage.setItem("histPauseData", JSON.stringify(newState))
    return newState
}else{
    const newState = false
    
    localStorage.setItem("histPauseData", JSON.stringify(newState))
return newState
}      
        }}})



export const pauseHistSliceAction = pauseHistSlice.actions;
export default pauseHistSlice