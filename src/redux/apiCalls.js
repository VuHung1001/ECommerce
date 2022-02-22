import { loginFailure, loginStart, loginSuccess, registerStart, registerSuccess, registerFailure } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    console.dir(err)
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try{
    const res = await publicRequest.post("/auth/register", user);
    console.dir(res)
    dispatch(registerSuccess());
  } catch (err) {
    console.dir(err)
    dispatch(registerFailure());
  }
}