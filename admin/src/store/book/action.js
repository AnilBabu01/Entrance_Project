import axios from "axios";

import {
  GET_BOOK,
  BLOCK_UNBLOCK_BOOK,
  TEST_DELETE_BOOK_DONE,
  CREATE_NEW_BOOK,
  EDIT_BOOK,
  CLOSE_BOOK_DIALOG,
  SET_CREATE_BOOK_DONE,
  SET_UPDATE_BOOK_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getBOOK = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/book`)
    .then((res) => {
      console.log("BOOK is BOOK", res);

      dispatch({ type: GET_BOOK, payload: res.data });
    })
    .catch((error) => console.log(error));
};


export const blockUnblockBOOK = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-book/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_BOOK, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/book/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_BOOK_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewBOOK = (formData) => (dispatch) => {
  axios
    .post("/admin/book", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_BOOK, payload: res.data.data });
      dispatch({ type: CLOSE_BOOK_DIALOG });
      dispatch({ type: SET_CREATE_BOOK_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editBOOK = (formData, id) => (dispatch) => {
  axios
    .put("/admin/book", formData)
    .then((res) => {
      dispatch({
        type: EDIT_BOOK,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_BOOK_DIALOG });
      dispatch({ type: SET_UPDATE_BOOK_DONE });
    })
    .catch((error) => console.log(error));
};
