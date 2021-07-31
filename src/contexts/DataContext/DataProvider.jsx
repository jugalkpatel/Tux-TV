import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { useAuth } from "..";
import { actions } from "../../utils/actions";
import { dataReducer } from "./dataReducer";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const { userID, token } = useAuth();

  useEffect(() => {
    (async () => {
      const { SET_PLAYLISTS, SET_SAVES } = actions;
      if (!token || !userID) {
        return;
      }

      const URLs = [
        `https://tuxtv.herokuapp.com/user/${userID}/playlists`,
        `https://tuxtv.herokuapp.com/user/${userID}/saved`,
      ];

      try {
        const requests = URLs.map((URL) => axios.get(URL).catch((err) => err));

        const [playlists, saves] = await axios.all(requests);

        if (playlists?.data) {
          dispatchData({
            type: SET_PLAYLISTS,
            payload: { ...playlists.data },
          });
        }

        if (saves?.data) {
          dispatchData({
            type: SET_SAVES,
            payload: { ...saves.data },
          });
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, [token, userID]);

  const initialData = {
    playlists: [],
    saves: [],
  };

  const [state, dispatchData] = useReducer(dataReducer, initialData);

  return (
    <DataContext.Provider value={{ ...state, dispatchData }}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => useContext(DataContext);

export { DataProvider, useData };
