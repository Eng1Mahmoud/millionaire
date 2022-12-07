import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeId: 0, error: false,logdin:false };

const ActiveUserSlice = createSlice({
  name: "activeId",
  initialState,
  reducers: {
    setActiveId: (state, { payload }) => {
      state.activeId = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setLogdIn:(state,{payload})=>{
      state.logdin = payload
    }

  },
});

export const { setActiveId, setError, setLogdIn } = ActiveUserSlice.actions;
export default ActiveUserSlice.reducer;
