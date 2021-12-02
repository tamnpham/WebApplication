import { configureStore } from "@reduxjs/toolkit";
import questionOptionReducer from "./questionOptionSlice"

export const store = configureStore({
    reducer: {
      question: questionOptionReducer,
    }
});