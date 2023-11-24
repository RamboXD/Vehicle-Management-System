import { createSlice } from "@reduxjs/toolkit";

interface LanguageState {
  language: "en" | "kk" | "ru";
}

const initialState: LanguageState = {
  language: "en",
};

export const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
