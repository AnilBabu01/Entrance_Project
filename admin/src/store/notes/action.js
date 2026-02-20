import axios from "axios";

import {
  GET_NOTES,
  BLOCK_UNBLOCK_NOTES,
  TEST_DELETE_NOTES_DONE,
  CREATE_NEW_NOTES,
  EDIT_NOTES,
  CLOSE_NOTES_DIALOG,
  SET_CREATE_NOTES_DONE,
  SET_UPDATE_NOTES_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getNOTES = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/unit`)
    .then((res) => {
      console.log("NOTES is NOTES", res);

      dispatch({ type: GET_NOTES, payload: res.data });
    })
    .catch((error) => console.log(error));
};


export const blockUnblockNOTES = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-unit/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_NOTES, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/unit/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_NOTES_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewNOTES = (formData) => (dispatch) => {
  axios
    .post("/admin/unit", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_NOTES, payload: res.data.data });
      dispatch({ type: CLOSE_NOTES_DIALOG });
      dispatch({ type: SET_CREATE_NOTES_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editNOTES = (formData, id) => (dispatch) => {
  axios
    .put("/admin/unit", formData)
    .then((res) => {
      dispatch({
        type: EDIT_NOTES,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_NOTES_DIALOG });
      dispatch({ type: SET_UPDATE_NOTES_DONE });
    })
    .catch((error) => console.log(error));
};
