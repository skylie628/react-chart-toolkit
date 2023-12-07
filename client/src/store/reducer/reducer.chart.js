import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  chartType: "pie",
  chartValues: [],
};
const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setChartType: (state, action) => {
      return { ...state, chartType: action.payload.data };
    },
    setChartValues: (state, action) => {
      return { ...state, chartValues: action.payload.chartValues };
    },
    resetChartValues: (state, action) => {
      return { ...state, chartValues: [] };
    },
  },
});
export const { setChartType, setChartValues, resetChartValues } =
  chartSlice.actions;
export default chartSlice.reducer;
