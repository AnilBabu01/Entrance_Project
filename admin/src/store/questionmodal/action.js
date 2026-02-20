import axios from "axios";

import {
  GET_QUESTIONMODAL,
  BLOCK_UNBLOCK_QUESTIONMODAL,
  TEST_DELETE_QUESTIONMODAL_DONE,
  CREATE_NEW_QUESTIONMODAL,
  EDIT_QUESTIONMODAL,
  CLOSE_QUESTIONMODAL_DIALOG,
  SET_CREATE_QUESTIONMODAL_DONE,
  SET_UPDATE_QUESTIONMODAL_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getQUESTIONMODAL = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/question-modal`)
    .then((res) => {
      console.log("QUESTIONMODAL is QUESTIONMODAL", res);

      dispatch({ type: GET_QUESTIONMODAL, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockQUESTIONMODAL = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-question-modal/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_QUESTIONMODAL, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/question-modal/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_QUESTIONMODAL_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewQUESTIONMODAL = (formData) => (dispatch) => {
  axios
    .post("/admin/question-modal", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_QUESTIONMODAL, payload: res.data.data });
      dispatch({ type: CLOSE_QUESTIONMODAL_DIALOG });
      dispatch({ type: SET_CREATE_QUESTIONMODAL_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editQUESTIONMODAL = (formData, id) => (dispatch) => {
  axios
    .put("/admin/question-modal", formData)
    .then((res) => {
      dispatch({
        type: EDIT_QUESTIONMODAL,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_QUESTIONMODAL_DIALOG });
      dispatch({ type: SET_UPDATE_QUESTIONMODAL_DONE });
    })
    .catch((error) => console.log(error));
};
