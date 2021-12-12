import { configureStore } from "@reduxjs/toolkit";
import questionOptionReducer from "./questionSlice"
import answersSubmitReducer from "./answersSlice"

export const store = configureStore({
    reducer: {
      question: questionOptionReducer,
      answers: answersSubmitReducer
    }
});