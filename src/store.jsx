import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/Counter'
import asyncReducer from './features/AsyncTest'


export const store = configureStore({
    reducer: {
        counter:counterReducer,
        async:asyncReducer,
    },
});
