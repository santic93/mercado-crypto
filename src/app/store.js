import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "../features/cryptoSlice";
import freqReducer from "../features/FreqSlice"

export default configureStore({
  reducer: {
    crypto: cryptoReducer,
    freq:freqReducer,
  },
});
