import axios from "axios";

import {
  GET_PRACTICAL,
  BLOCK_UNBLOCK_PRACTICAL,
  TEST_DELETE_PRACTICAL_DONE,
  CREATE_NEW_PRACTICAL,
  EDIT_PRACTICAL,
  CLOSE_PRACTICAL_DIALOG,
  SET_CREATE_PRACTICAL_DONE,
  SET_UPDATE_PRACTICAL_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getPRACTICAL = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/practical`)
    .then((res) => {
      console.log("PRACTICAL is PRACTICAL", res);

      dispatch({ type: GET_PRACTICAL, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockPRACTICAL = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-practical/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_PRACTICAL, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/practical/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_PRACTICAL_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewPRACTICAL = (formData) => (dispatch) => {
  axios
    .post("/admin/practical", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_PRACTICAL, payload: res.data.data });
      dispatch({ type: CLOSE_PRACTICAL_DIALOG });
      dispatch({ type: SET_CREATE_PRACTICAL_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editPRACTICAL = (formData, id) => (dispatch) => {
  axios
    .put("/admin/practical", formData)
    .then((res) => {
      dispatch({
        type: EDIT_PRACTICAL,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_PRACTICAL_DIALOG });
      dispatch({ type: SET_UPDATE_PRACTICAL_DONE });
    })
    .catch((error) => console.log(error));
};
