import "./ResponsivePlayer.css";
import ReactPlayer from "react-player";
const ResponsivePlayer = ({ url }) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  );
};

export { ResponsivePlayer };
