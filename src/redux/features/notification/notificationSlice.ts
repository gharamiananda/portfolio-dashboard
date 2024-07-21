import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../../store';


type TAuthState = {
  message: null | string;
};

const initialState: TAuthState = {
  message: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
   
  },
});

export const { setNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

// export const useCurrentToken = (state: RootState) => state.auth.token;
