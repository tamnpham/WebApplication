import { configureStore } from "@reduxjs/toolkit";
import questionOptionReducer from "./questionSlice"

export const store = configureStore({
    reducer: {
      question: questionOptionReducer,
    }
});