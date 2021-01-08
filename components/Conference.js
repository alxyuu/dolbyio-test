import React from "react";
import { reducer as voxeetReducer } from "@voxeet/react-components";
import thunkMidleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import { ConferenceRoom, VoxeetProvider } from "@voxeet/react-components";

// Import Style
import "@voxeet/react-components/dist/voxeet-react-components.css";

const reducers = combineReducers({
  voxeet: voxeetReducer,
});

const configureStore = () =>
  createStore(reducers, applyMiddleware(thunkMidleware));

export default function Conference(props) {
  return (
    <VoxeetProvider store={configureStore()}>
      <ConferenceRoom
        autoJoin
        conferenceAlias={"test123"}
        isWidget={false}
        {...props}
      />
    </VoxeetProvider>
  );
}
