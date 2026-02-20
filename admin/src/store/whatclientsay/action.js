import axios from "axios";

import {
  GET_WHATCLIENTSAY,
  BLOCK_UNBLOCK_WHATCLIENTSAY,
  TEST_DELETE_WHATCLIENTSAY_DONE,
  CREATE_NEW_WHATCLIENTSAY,
  EDIT_WHATCLIENTSAY,
  CLOSE_WHATCLIENTSAY_DIALOG,
  SET_CREATE_WHATCLIENTSAY_DONE,
  SET_UPDATE_WHATCLIENTSAY_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getWHATCLIENTSAY = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/whatsayclient`)
    .then((res) => {
      console.log("WHATCLIENTSAY is WHATCLIENTSAY", res);

      dispatch({ type: GET_WHATCLIENTSAY, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockWHATCLIENTSAY = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-whatsayclient/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_WHATCLIENTSAY, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/whatsayclient/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_WHATCLIENTSAY_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewWHATCLIENTSAY = (formData) => (dispatch) => {
  axios
    .post("/admin/whatsayclient", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_WHATCLIENTSAY, payload: res.data.data });
      dispatch({ type: CLOSE_WHATCLIENTSAY_DIALOG });
      dispatch({ type: SET_CREATE_WHATCLIENTSAY_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editWHATCLIENTSAY = (formData, id) => (dispatch) => {
  axios
    .put("/admin/whatsayclient", formData)
    .then((res) => {
      dispatch({
        type: EDIT_WHATCLIENTSAY,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_WHATCLIENTSAY_DIALOG });
      dispatch({ type: SET_UPDATE_WHATCLIENTSAY_DONE });
    })
    .catch((error) => console.log(error));
};
