import axios from "axios";

import {
  GET_NOTESUNIT,
  BLOCK_UNBLOCK_NOTESUNIT,
  TEST_DELETE_NOTESUNIT_DONE,
  CREATE_NEW_NOTESUNIT,
  EDIT_NOTESUNIT,
  CLOSE_NOTESUNIT_DIALOG,
  SET_CREATE_NOTESUNIT_DONE,
  SET_UPDATE_NOTESUNIT_DONE,
} from "./types";

import { apiInstanceFetch } from "../../util/api";

export const getNOTESUNIT = () => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/notes`)
    .then((res) => {
      console.log("NOTESUNIT is NOTESUNIT", res);

      dispatch({ type: GET_NOTESUNIT, payload: res.data });
    })
    .catch((error) => console.log(error));
};


export const blockUnblockNOTESUNIT = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-notes/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_NOTESUNIT, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const deleteTestcategory = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/notes/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: TEST_DELETE_NOTESUNIT_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createNewNOTESUNIT = (formData) => (dispatch) => {
  axios
    .post("/admin/notes", formData)
    .then((res) => {
      dispatch({ type: CREATE_NEW_NOTESUNIT, payload: res.data.data });
      dispatch({ type: CLOSE_NOTESUNIT_DIALOG });
      dispatch({ type: SET_CREATE_NOTESUNIT_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editNOTESUNIT = (formData, id) => (dispatch) => {
  axios
    .put("/admin/notes", formData)
    .then((res) => {
      dispatch({
        type: EDIT_NOTESUNIT,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: CLOSE_NOTESUNIT_DIALOG });
      dispatch({ type: SET_UPDATE_NOTESUNIT_DONE });
    })
    .catch((error) => console.log(error));
};
