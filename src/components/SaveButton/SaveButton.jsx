import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import Loader from "react-loader-spinner";

import { useAuth, useData, useToast } from "../../contexts";
import { actions } from "../../utils/actions";
import { isInSaves } from "../../utils/isVideoInSaves";
import { postAPI } from "../../utils/postAPI";

const SaveButton = ({ data }) => {
  const {
    btnClass,
    ldColor,
    id,
    svgSaved,
    svgNotSaved,
    btnText,
    btnTextClass,
  } = data;
  const { ADD_TO_SAVE, REMOVE_FROM_SAVE } = actions;
  const navigate = useNavigate();
  const { saves, dispatchData } = useData();
  const { userID, isLoggedIn } = useAuth();
  const { addToast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const isVideoInSaves = isInSaves(id, saves);
  const action = !isVideoInSaves ? ADD_TO_SAVE : REMOVE_FROM_SAVE;
  const svg = !isVideoInSaves ? svgNotSaved : svgSaved;

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  const onSaveClick = async () => {
    setLoading(true);

    const URL = !isVideoInSaves
      ? `/user/${userID}/saved/add`
      : `/user/${userID}/saved/remove`;

    if (!isLoading) {
      const { data, status } = await postAPI(URL, { id });

      setLoading(false);

      if (status === 201) {
        const toastMessage = !isVideoInSaves
          ? "Added to Saves"
          : "Removed from Saves";
        dispatchData({ type: action, payload: { ...data } });
        addToast(toastMessage);
      } else {
        addToast("Operation failed....", "error");
      }
    }
  };

  const handleClick = isLoggedIn
    ? () => onSaveClick()
    : () => navigate("/login");

  return (
    <>
      <button className={btnClass} onClick={handleClick}>
        {isLoading ? (
          <Loader
            type="Bars"
            color={ldColor ? "#ffd14a" : "#fff"}
            height={btnText ? 27.19 : 13.33}
            width={btnText ? 27.19 : 13.33}
          />
        ) : (
          svg
        )}
        {btnText && <span className={btnTextClass}>{btnText}</span>}
      </button>
    </>
  );
};
export { SaveButton };
