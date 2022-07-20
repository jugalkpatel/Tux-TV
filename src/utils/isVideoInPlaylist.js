const isVideoInPlaylist = (videoID, playlistID, playlists) => {
  const isPlaylistExists = playlists.filter(
    (playlist) => playlist.id === playlistID
  )[0].videos;

  const isVideoExists =
    isPlaylistExists.length &&
    isPlaylistExists.filter((video) => video.id === videoID);

  return isVideoExists.length ? true : false;
};

export { isVideoInPlaylist };
