import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};
export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // get all events of shop
    .addCase("getAllShopEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.events = action.payload;
    })
    .addCase("getAllShopEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // delete event of a shop
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.allEvents = action.payload;
    })
    .addCase("getAllEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
