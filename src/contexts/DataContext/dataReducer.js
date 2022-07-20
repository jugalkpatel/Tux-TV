import { actions } from "../../utils/actions";

const dataReducer = (state, { type, payload }) => {
  const {
    SET_PLAYLISTS,
    SET_SAVES,
    CREATE_PLAYLIST,
    ADD_TO_PLAYLIST,
    REMOVE_FROM_PLAYLIST,
    ADD_TO_SAVE,
    REMOVE_FROM_SAVE,
    REMOVE_PLAYLIST,
    CLEAR_DATA,
  } = actions;

  switch (type) {
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: [...state.playlists, ...payload.playlists],
      };
    case SET_SAVES:
      return {
        ...state,
        saves: [...state.saves, ...payload.saves],
      };
    case CREATE_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, payload.playlist],
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlist) => playlist.id !== payload.playlist
        ),
      };
    case ADD_TO_PLAYLIST:
      const { playlist: playlistID, video } = payload;
      const updatedPlaylist = state.playlists.map((playlist) => {
        if (playlist.id === playlistID) {
          return { ...playlist, videos: playlist.videos.concat(video) };
        }
        return playlist;
      });
      return { ...state, playlists: updatedPlaylist };
    case REMOVE_FROM_PLAYLIST:
      const { playlist: pid, video: vid } = payload;
      return {
        ...state,
        playlists: state.playlists.map((playlist) => {
          if (playlist.id === pid) {
            return {
              ...playlist,
              videos: playlist.videos.filter((video) => video.id !== vid),
            };
          }
          return playlist;
        }),
      };
    case ADD_TO_SAVE:
      return {
        ...state,
        saves: [...state.saves, payload.saves],
      };
    case REMOVE_FROM_SAVE:
      return {
        ...state,
        saves: state.saves.filter((video) => video.id !== payload.video),
      };
    case CLEAR_DATA:
      return { ...state, playlists: [], saves: [] };
    default:
      return state;
  }
};

export { dataReducer };
