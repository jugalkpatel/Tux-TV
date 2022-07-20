import { useNavigate } from "react-router";
import { useAuth } from "../../contexts";
const PlaylistButton = ({ data }) => {
  const { btnClass, video, route, btnText, btnTextClass, svg } = data;

  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const path = route || "/modal";

  const handleClick = () =>
    navigate(isLoggedIn ? path : "/login", {
      state: { data: video },
    });

  return (
    <button onClick={handleClick} className={btnClass}>
      {svg && svg}
      {btnText && <span className={btnTextClass}>{btnText}</span>}
    </button>
  );
};

export { PlaylistButton };
