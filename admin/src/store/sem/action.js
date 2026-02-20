import axios from "axios";

import {
  GET_SEM,
  BLOCK_UNBLOCK_SEM,
  TEST_DELETE_SEM_DONE,
  CREATE_NEW_SEM,
  EDIT_SEM,
  CLOSE_SEM_DIALOG,
  SET_CREATE_SEM_DONE,
  SET_UPDATE_SEM_DONE,
  GET_SEM_BY_COURSE_ID,
  ERROR,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getSEM = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/sem`)
    .then((res) => {
      console.log("SEM is SEM", res);

      dispatch({ type: GET_SEM, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockSEM = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-SEM/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_SEM, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/sem/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_SEM_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const GetSemByCourseId = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/getSem-by-courseId/${id}`)
    .then((res) => {
      console.log("GET_SEM_BY_COURSE_ID", res.data);

      dispatch({ type: GET_SEM_BY_COURSE_ID, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewSEM = (formData) => (dispatch) => {
  console.log("Dispatching createNewSEM", formData);

  axios
    .post("/admin/sem", formData)
    .then((res) => {
      console.log("res from action", res);
      dispatch({ type: CREATE_NEW_SEM, payload: res.data.data });
      dispatch({ type: CLOSE_SEM_DIALOG });
      dispatch({ type: SET_CREATE_SEM_DONE });
    })
    .catch((error) => {
      console.log("from action", error?.response?.data?.msg);
      dispatch({ type: ERROR, payload: error?.response?.data?.msg });
    });
};

export const editSEM = (formData, id) => (dispatch) => {
  axios
    .put("/admin/sem", formData)
    .then((res) => {
      dispatch({
        type: EDIT_SEM,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_SEM_DIALOG });
      dispatch({ type: SET_UPDATE_SEM_DONE });
    })
    .catch((error) => console.log(error));
};
