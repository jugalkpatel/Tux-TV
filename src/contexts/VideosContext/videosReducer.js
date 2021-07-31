import { actions } from "../../utils/actions";
const videosReducer = (state, { type, payload }) => {
  const { SET_VIDEOS, SET_CHANNELS } = actions;
  switch (type) {
    case SET_VIDEOS:
      return {
        ...state,
        videos: payload.videos,
      };
    case SET_CHANNELS:
      return {
        ...state,
        channels: payload.channels,
      };
    default:
      return state;
  }
};

export { videosReducer };
