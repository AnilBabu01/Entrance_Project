import axios from "axios";

import {
  GET_MISSION,
  BLOCK_UNBLOCK_MISSION,
  TEST_DELETE_MISSION_DONE,
  CREATE_NEW_MISSION,
  EDIT_MISSION,
  CLOSE_MISSION_DIALOG,
  SET_CREATE_MISSION_DONE,
  SET_UPDATE_MISSION_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getMISSION = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/mission`)
    .then((res) => {
      console.log("MISSION is MISSION", res);

      dispatch({ type: GET_MISSION, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const blockUnblockMISSION = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-mission/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_MISSION, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/mission/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_MISSION_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewMISSION = (formData) => (dispatch) => {
  axios
    .post("/admin/mission", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_MISSION, payload: res.data.data });
      dispatch({ type: CLOSE_MISSION_DIALOG });
      dispatch({ type: SET_CREATE_MISSION_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editMISSION = (formData, id) => (dispatch) => {
  axios
    .put("/admin/MISSION", formData)
    .then((res) => {
      dispatch({
        type: EDIT_MISSION,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_MISSION_DIALOG });
      dispatch({ type: SET_UPDATE_MISSION_DONE });
    })
    .catch((error) => console.log(error));
};
