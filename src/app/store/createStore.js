<<<<<<< HEAD
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import professionsReducer from "./profession"
import qualitiesReducer from "./qualities"

const rootReducer = combineReducers({
  qualities: qualitiesReducer,
  professions: professionsReducer
})

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
=======
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
>>>>>>> 8f585a6ad783ff5c8179c7b04876d953e6c27ef1
}
