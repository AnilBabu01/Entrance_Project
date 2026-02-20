import axios from "axios";

import {
  GET_FAQ,
  BLOCK_UNBLOCK_FAQ,
  TEST_DELETE_FAQ_DONE,
  CREATE_NEW_FAQ,
  EDIT_FAQ,
  CLOSE_FAQ_DIALOG,
  SET_CREATE_FAQ_DONE,
  SET_UPDATE_FAQ_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getFAQ = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/faq`)
    .then((res) => {
      console.log("FAQ is FAQ", res);

      dispatch({ type: GET_FAQ, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockFAQ = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-faq/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_FAQ, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/faq/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_FAQ_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewFAQ = (formData) => (dispatch) => {
  axios
    .post("/admin/faq", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_FAQ, payload: res.data.data });
      dispatch({ type: CLOSE_FAQ_DIALOG });
      dispatch({ type: SET_CREATE_FAQ_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editFAQ = (formData, id) => (dispatch) => {
  axios
    .put("/admin/faq", formData)
    .then((res) => {
      dispatch({
        type: EDIT_FAQ,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_FAQ_DIALOG });
      dispatch({ type: SET_UPDATE_FAQ_DONE });
    })
    .catch((error) => console.log(error));
};
