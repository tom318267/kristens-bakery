import { SET_CURRENT_USER, CHECK_USER_SESSION } from "./user.types";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const checkUserSession = () => ({
  type: CHECK_USER_SESSION,
});
