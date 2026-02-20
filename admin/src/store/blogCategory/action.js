import axios from "axios";

import {
  GET_BlogCategory,
  BLOCK_UNBLOCK_BlogCategory,
  TEST_DELETE_BlogCategory_DONE,
  CREATE_NEW_BlogCategory,
  EDIT_BlogCategory,
  CLOSE_BlogCategory_DIALOG,
  SET_CREATE_BlogCategory_DONE,
  SET_UPDATE_BlogCategory_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getBlogCategory = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/blog-category`)
    .then((res) => {
      console.log("BlogCategory is BlogCategory", res);

      dispatch({ type: GET_BlogCategory, payload: res.data });
    })
    .catch((error) => console.log(error));
};


export const blockUnblockBlogCategory = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-blog-category/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_BlogCategory, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/blog-category/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_BlogCategory_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewBlogCategory = (formData) => (dispatch) => {
  axios
    .post("/admin/blog-category", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_BlogCategory, payload: res.data.data });
      dispatch({ type: CLOSE_BlogCategory_DIALOG });
      dispatch({ type: SET_CREATE_BlogCategory_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editBlogCategory = (formData, id) => (dispatch) => {
  axios
    .put("/admin/blog-category", formData)
    .then((res) => {
      dispatch({
        type: EDIT_BlogCategory,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_BlogCategory_DIALOG });
      dispatch({ type: SET_UPDATE_BlogCategory_DONE });
    })
    .catch((error) => console.log(error));
};
