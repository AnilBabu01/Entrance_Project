import axios from "axios";

import {
  GET_SUBJECT,
  BLOCK_UNBLOCK_SUBJECT,
  TEST_DELETE_SUBJECT_DONE,
  CREATE_NEW_SUBJECT,
  EDIT_SUBJECT,
  CLOSE_SUBJECT_DIALOG,
  SET_CREATE_SUBJECT_DONE,
  SET_UPDATE_SUBJECT_DONE,
  GET_SUBJECT_BY_COURSE_ID_SEM_ID,
} from "./types";
import { apiInstanceFetch } from "../../util/api";

export const getSUBJECT = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/SUBJECT`)
    .then((res) => {
      console.log("SUBJECT is SUBJECT", res);

      dispatch({ type: GET_SUBJECT, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockSUBJECT = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-SUBJECT/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_SUBJECT, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/SUBJECT/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_SUBJECT_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const GetSubjectByCourseIdSemId = (courseId, sem) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/getSubject-by-courseIdAndSem/${courseId}/${sem}`)
    .then((res) => {
      console.log("GET_SUBJECT_BY_COURSE_ID_SEM_ID", res.data);

      dispatch({ type: GET_SUBJECT_BY_COURSE_ID_SEM_ID, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewSUBJECT = (formData) => (dispatch) => {
  axios
    .post("/admin/SUBJECT", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_SUBJECT, payload: res.data.data });
      dispatch({ type: CLOSE_SUBJECT_DIALOG });
      dispatch({ type: SET_CREATE_SUBJECT_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editSUBJECT = (formData, id) => (dispatch) => {
  axios
    .put("/admin/SUBJECT", formData)
    .then((res) => {
      dispatch({
        type: EDIT_SUBJECT,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_SUBJECT_DIALOG });
      dispatch({ type: SET_UPDATE_SUBJECT_DONE });
    })
    .catch((error) => console.log(error));
};
