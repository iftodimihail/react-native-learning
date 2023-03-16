import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    toggleFavorite: (state, { payload }) => {
      if (state.ids.includes(payload.id)) {
        state.ids.splice(state.ids.indexOf(payload.id), 1);
      } else {
        state.ids.push(payload.id);
      }
    },
  },
});

export const toggleFavorite = favoritesSlice.actions.toggleFavorite;

export default favoritesSlice.reducer;
