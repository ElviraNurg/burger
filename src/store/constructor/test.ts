/* import { createAsyncThunk, createSlice, SerializedError } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface ResponseData {
  data: any;
  ok: boolean;
  // Другие свойства, если они присутствуют в ответе
}

// Пример асинхронной санки для выполнения GET запроса на сервер
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://example.com/api/data');
      if (!response.ok) {
        throw new Error('Server returned not okay response');
      }
      const responseData: ResponseData = await response.json();
      if (!responseData.ok) {
        throw new Error('Server returned not okay response');
      }
      return responseData.data;
    } catch (error) {
      // Указываем тип ошибки явно как SerializedError
      return rejectWithValue({ message: error.message } as SerializedError);
    }
  }
);

// Пример слайса, объединяющего ваш state и reducers
export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null as SerializedError | null, // Указываем тип ошибки явно
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Пример селектора для доступа к данным из вашего состояния
export const selectData = (state: RootState) => state.data.data;

export default dataSlice.reducer; */