import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/UserSlice";
import seedlingReducer from '../Features/ImportedSeedlingSlice';
import localSeedlingReducer from '../Features/LocalSeedlingSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        seedlings: seedlingReducer,
        localseedlings: localSeedlingReducer
    },
});