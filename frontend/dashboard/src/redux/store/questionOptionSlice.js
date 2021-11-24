import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  questionOptions: {
    categories: "",
    numberQuestions: 0,
    time: 0,
  },
  question: [],
  index: 0,
  score: 0
};

// Cấu hình slice
export const questionOptionSlice = createSlice({
  name: "question", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    getQuestionOptions: (state, action) => {
      state.questionOptions = action.payload;
    },
  },
});

export const { getQuestionOptions } = questionOptionSlice.actions;
export const selectQuestionOptions = state => state.question.questionOptions;
export default questionOptionSlice.reducer;
