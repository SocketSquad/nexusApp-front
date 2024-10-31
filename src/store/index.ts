import { configureStore } from '@reduxjs/toolkit';

// Define the shape of your root state (if needed)
interface RootState {
  // Define your state properties here
}

// Create the store
const store = configureStore<RootState>({
  reducer: {
    // Add your reducers here
  },
});

// Export the store and types
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

export default store;
