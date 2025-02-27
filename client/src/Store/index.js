import {configureStore} from '@reduxjs/toolkit'
import loginSlice from './loginSlice';
import pauseHistSlice from './historySlice';
import searchSlice from './SearchSlice';




const finalStore = configureStore({
reducer:{
loginData:loginSlice.reducer,
PauseData:pauseHistSlice.reducer,
searchedData:searchSlice.reducer
}})


export default finalStore;