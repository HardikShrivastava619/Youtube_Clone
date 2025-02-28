import { createSlice } from "@reduxjs/toolkit";




const user = JSON.parse(localStorage.getItem("utubeloginuser")) || { user: null, token: "" };

const loginSlice = createSlice({
  name: "loginData",
  initialState: user,
  reducers: {
    loginReducer: (state, action) => {


      state.user = action.payload.user;
      state.token = action.payload.token;


      localStorage.setItem("utubeloginuser", JSON.stringify(state));
    },

    logOutReducer: (state, action) => {
      
      localStorage.removeItem("utubeloginuser");
console.log(action.payload);

  
      return { user: null, token: "" };
    },
  },
});

export const loginSliceAction = loginSlice.actions;
export default loginSlice;
