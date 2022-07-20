import { setupAuthHeaderForServiceCalls } from "./setupRequestHeader";

const logout = (callback, action) => {
  localStorage?.removeItem("ttv");
  callback({ type: action });
  setupAuthHeaderForServiceCalls(null);
};

export { logout };
