import React, { createContext, useContext, useReducer } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_VIDEOS":
        return { ...state, videos: payload.videos };
      case "SET_CHANNELS":
        return { ...state, channels: payload.channels };
      default:
        return state;
    }
  };

  const initialData = {
    videos: null,
    channels: null,
    playlists: null,
    saved: null,
  };

  const [state, dispatchData] = useReducer(reducer, initialData);

  // const onSaveClick = async (url, constant, payload, dispatchData) => {

  // };

  // const onAddToPlaylistClick = (url, constant, payload, callback) => {
  //   // call api with url and payload
  //   // on success call callback
  //   // on error show toast of operation failed
  // };

  // console.log({ state });

  return (
    <DataContext.Provider value={{ ...state, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
