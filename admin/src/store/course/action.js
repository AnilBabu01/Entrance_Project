import axios from "axios";

import {
  GET_COURSE,
  BLOCK_UNBLOCK_COURSE,
  TEST_DELETE_COURSE_DONE,
  CREATE_NEW_COURSE,
  EDIT_COURSE,
  CLOSE_COURSE_DIALOG,
  SET_CREATE_COURSE_DONE,
  SET_UPDATE_COURSE_DONE,
 
} from "./types";
import { apiInstanceFetch } from "../../util/api";


export const getCOURSE = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/course`)
    .then((res) => {

      console.log("course is course",res)

      dispatch({ type: GET_COURSE, payload: res.data });
    })
    .catch((error) => console.log(error));
};



export const blockUnblockCOURSE = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-course/${id}`)
    .then((res) => {

      console.log("block",res.data);
      
      dispatch({ type: BLOCK_UNBLOCK_COURSE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/course/${id}`)
    .then((res) => {

      console.log("delete",res.data );

      dispatch({ type: TEST_DELETE_COURSE_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewCOURSE = (formData) => (dispatch) => {
  axios
    .post("/admin/course", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_COURSE, payload: res.data.data });
      dispatch({ type: CLOSE_COURSE_DIALOG });
      dispatch({ type: SET_CREATE_COURSE_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editCOURSE = (formData, id) => (dispatch) => {
  axios
    .put("/admin/course", formData)
    .then((res) => {
     
      dispatch({
        type: EDIT_COURSE,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_COURSE_DIALOG });
      dispatch({ type: SET_UPDATE_COURSE_DONE });
    })
    .catch((error) => console.log(error));
};



