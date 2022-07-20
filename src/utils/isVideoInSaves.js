const isInSaves = (videoID, saves) => {
  if (!saves.length) {
    return false;
  }

  return saves.filter((video) => video.id === videoID).length ? true : false;
};

export { isInSaves };
