import { useState, useEffect } from "react";

import "./CreatePlaylist.css";
import Loader from "react-loader-spinner";

import { actions } from "../../utils/actions";
import { postAPI } from "../../utils/postAPI";
import { useAuth, useData, useToast } from "../../contexts";

const debounced = (callback, threshold) => {
  let id;

  return (...args) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(() => {
      callback(...args);
    }, threshold);
  };
};

const checkName = (newTitle, allPlaylist) => {
  return !!allPlaylist.find(({ title }) => title === newTitle);
};

const showError = debounced((value, playlists, setError) => {
  if (checkName(value, playlists)) {
    setError(true);
  } else {
    setError(false);
  }
}, 200);

const CreatePlaylist = ({ displayAddPlaylist }) => {
  const { CREATE_PLAYLIST } = actions;
  const { userID } = useAuth();
  const { dispatchData, playlists } = useData();
  const { addToast } = useToast();

  const [title, setTitle] = useState("");
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setError(false);
      setLoading(false);
    };
  }, []);

  const onCreatePlaylistClick = async () => {
    if (title.length < 1) {
      return;
    }

    setLoading(true);

    if (!isLoading && !isError) {
      const { data, status } = await postAPI(
        `/user/${userID}/playlists/create`,
        { title }
      );

      if (status === 201) {
        dispatchData({ type: CREATE_PLAYLIST, payload: { ...data } });
        addToast(`${title} Created Successfully`);
      } else {
        addToast("Creating Playlist failed....", "error");
      }

      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setTitle(newValue);
    showError(newValue, playlists, setError);
  };

  return (
    <section className="cp-list--v" style={{ display: displayAddPlaylist }}>
      <span className="cp__label--name">Name</span>
      <input
        type="text"
        className="cp__input--name"
        placeholder="Enter playlist name...."
        value={title}
        onChange={handleChange}
        minLength="1"
        maxLength="60"
      />
      {isError && (
        <span className="cp__label--error">Playlist Name not available !</span>
      )}

      <button
        className="cp__btn--create"
        disabled={isError}
        onClick={() => {
          onCreatePlaylistClick();
          setTitle("");
        }}
      >
        {isLoading ? (
          <Loader type="Bars" color="#212121" height={16} width={16} />
        ) : (
          "CREATE"
        )}
      </button>
    </section>
  );
};

export { CreatePlaylist };
