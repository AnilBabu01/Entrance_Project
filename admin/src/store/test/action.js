import axios from "axios";

import {
  GET_TEST,
  BLOCK_UNBLOCK_TEST,
  TEST_DELETE_TEST_DONE,
  CREATE_NEW_TEST,
  EDIT_TEST,
  CLOSE_TEST_DIALOG,
  SET_CREATE_TEST_DONE,
  SET_UPDATE_TEST_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getTEST = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/test`)
    .then((res) => {
      console.log("TEST is TEST", res);

      dispatch({ type: GET_TEST, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockTEST = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-test/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_TEST, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/test/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_TEST_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};


export const createNewTEST = (formData) => (dispatch) => {
  axios
    .post("/admin/test", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_TEST, payload: res.data.data });
      dispatch({ type: CLOSE_TEST_DIALOG });
      dispatch({ type: SET_CREATE_TEST_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editTEST = (formData, id) => (dispatch) => {
  axios
    .put("/admin/test", formData)
    .then((res) => {
      dispatch({
        type: EDIT_TEST,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_TEST_DIALOG });
      dispatch({ type: SET_UPDATE_TEST_DONE });
    })
    .catch((error) => console.log(error));
};
