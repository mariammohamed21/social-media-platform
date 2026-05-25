import { createSlice } from '@reduxjs/toolkit';
const slice=createSlice({name:'theme', initialState:{mode:localStorage.getItem('theme')||'light'}, reducers:{toggleTheme(s){s.mode=s.mode==='light'?'dark':'light'; localStorage.setItem('theme',s.mode)}}});
export const { toggleTheme }=slice.actions;
export default slice.reducer;
