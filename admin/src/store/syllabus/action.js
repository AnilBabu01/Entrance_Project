import axios from "axios";

import {
  GET_SYLLABUS,
  BLOCK_UNBLOCK_SYLLABUS,
  TEST_DELETE_SYLLABUS_DONE,
  CREATE_NEW_SYLLABUS,
  EDIT_SYLLABUS,
  CLOSE_SYLLABUS_DIALOG,
  SET_CREATE_SYLLABUS_DONE,
  SET_UPDATE_SYLLABUS_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";


export const getSYLLABUS = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/syllabus`)
    .then((res) => {
      console.log("SYLLABUS is SYLLABUS", res);

      dispatch({ type: GET_SYLLABUS, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockSYLLABUS = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-syllabus/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_SYLLABUS, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/syllabus/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_SYLLABUS_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};





export const createNewSYLLABUS = (formData) => (dispatch) => {
  axios
    .post("/admin/syllabus", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_SYLLABUS, payload: res.data.data });
      dispatch({ type: CLOSE_SYLLABUS_DIALOG });
      dispatch({ type: SET_CREATE_SYLLABUS_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editSYLLABUS = (formData, id) => (dispatch) => {
  axios
    .put("/admin/syllabus", formData)
    .then((res) => {
      dispatch({
        type: EDIT_SYLLABUS,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_SYLLABUS_DIALOG });
      dispatch({ type: SET_UPDATE_SYLLABUS_DONE });
    })
    .catch((error) => console.log(error));
};
