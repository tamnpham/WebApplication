import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  questionOptions: {},
};

// Cấu hình slice
export const questionSlice = createSlice({
  name: "question", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    getQuestionOptions: (state, action) => {
      state.questionOptions = action.payload;
      // console.log(state.questionOptions);
      // console.log(action.payload);
    },
  },
});

export const { getQuestionOptions } = questionSlice.actions;
export const selectQuestionOptions = state => state.question.questionOptions;
export default questionSlice.reducer;
