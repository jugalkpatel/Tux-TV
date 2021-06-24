import React from "react";
import "./CreatePlaylist.css";
const CreatePlaylist = () => {
  return (
    <section
      className="modal__playlist-create"
      // style={{ display: displayAddPlaylist }}
    >
      <span className="modal__playlist-name">Name</span>
      <input
        type="text"
        className="modal__playlist-name__field"
        placeholder="Enter playlist name...."
      />
      <button className="modal__playlist-create__create-btn">CREATE</button>
    </section>
  );
};

export { CreatePlaylist };
