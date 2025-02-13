import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import {
  getAllUsersFailure,
  getAllUsersStart,
  getAllUsersSuccess,  
} from './userRedux'

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

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    console.dir(err)
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest().delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    console.dir(err)
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest().put(`/products/${id}`, product);
    dispatch(updateProductSuccess({ id, product: res.data }));
  } catch (err) {
    console.dir(err)
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest().post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.dir(err)
    dispatch(addProductFailure());
  }
};

export const getAllUsers = async (dispatch) => {
  dispatch(getAllUsersStart());
  try {
    const res = await userRequest().get("/users");
    dispatch(getAllUsersSuccess(res.data));
  } catch (err) {
    console.dir(err)
    dispatch(getAllUsersFailure());
  }
};
