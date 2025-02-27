import { createSlice } from "@reduxjs/toolkit"

const searchedVid  = JSON.parse(localStorage.getItem('utubeSearch')) || ''
const searchResult = JSON.parse(localStorage.getItem('utubeSearchedResult')) || []



const searchSlice = createSlice({
    name:'searchedData',
    initialState:{
        keyWord:searchedVid,
        result:searchResult 
    },
    reducers:{
searchVid : (state , action)=>{
    
    state.keyWord = action.payload
    
     localStorage.setItem('utubeSearch',JSON.stringify(state.keyWord))
     return state
},

searchResult:(state , action)=>{
    state.result = action.payload
     localStorage.setItem('utubeSearchedResult',JSON.stringify(state.result))
     return state
}


}
})


export const searchSliceAction = searchSlice.actions;
export default searchSlice