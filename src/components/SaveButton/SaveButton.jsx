import { useState } from "react";
import { useNavigate } from "react-router";

import Loader from "react-loader-spinner";

import { useAuth, useData, useToast } from "../../contexts";
import { actions } from "../../utils/actions";
import { isInSaves } from "../../utils/isVideoInSaves";
import { postAPI } from "../../utils/postAPI";

const SaveButton = ({ data }) => {
  const { btnClass, id, svgSaved, svgNotSaved, btnText, btnTextClass } = data;
  const { ADD_TO_SAVE, REMOVE_FROM_SAVE } = actions;
  const navigate = useNavigate();
  const { saves, dispatchData } = useData();
  const { userID, isLoggedIn } = useAuth();
  const { setupToast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const isVideoInSaves = isInSaves(id, saves);
  const action = !isVideoInSaves ? ADD_TO_SAVE : REMOVE_FROM_SAVE;
  const svg = !isVideoInSaves ? svgNotSaved : svgSaved;

  const onSaveClick = async () => {
    setLoading(true);

    const URL = !isVideoInSaves
      ? `https://tuxtv.herokuapp.com/user/${userID}/saved/add`
      : `https://tuxtv.herokuapp.com/user/${userID}/saved/remove`;

    if (!isLoading) {
      const { data, status } = await postAPI(URL, { id });

      if (status === 201) {
        dispatchData({ type: action, payload: { ...data } });
      } else {
        // TODO: OPERATION FAILED
        setupToast("Operation failed....");
      }

      setLoading(false);
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
            color={btnText ? "#ffd14a" : "#fff"}
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
