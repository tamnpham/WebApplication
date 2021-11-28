import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  quizId: 0,  
  duration: "00:00:00",
  submitedAnswers: [],
  questions:[]
};

// Cấu hình slice
export const answersSubmitSlice = createSlice({
  name: "answers", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    setSubmitAnswers: (state, action) => {
      state.submitedAnswers = action.payload;
    },
    setQuizId : (state, action) => {
      state.quizId = action.payload;
    },
    setResultQuestions : (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { setSubmitAnswers, setQuizId, setResultQuestions } = answersSubmitSlice.actions;
export const selectSubmitAnswers = state => state.answers;
export default answersSubmitSlice.reducer;
