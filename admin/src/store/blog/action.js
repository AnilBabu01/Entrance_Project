import axios from "axios";
import * as ActionType from "./types";
import { apiInstanceFetch } from "../../util/api";
import { BLOG_DELETE_DONE, BLOCK_UNBLOCK_BLOG } from "../../store/blog/types";

export const getAllBLOG = () => (dispatch) => {
  apiInstanceFetch
    .get("/admin/blog")
    .then((res) => {
      if (res.status) {
        dispatch({
          type: ActionType.ALL_BLOG,
          payload: { data: res.data, total: res.total },
        });
      }
    })
    .catch((error) => console.log(error));
};

export const blockUnblockBLOG = (id) => (dispatch) => {
  apiInstanceFetch
    .get(`/admin/block-blog/${id}`)
    .then((res) => {
      console.log("block", res.data);

      dispatch({ type: BLOCK_UNBLOCK_BLOG, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const createBLOG = (formData) => (dispatch) => {
  axios
    .post("/admin/blog", formData)
    .then((res) => {
      dispatch({
        type: ActionType.CREATE_NEW_BLOG,
        payload: res?.data?.data,
      });
      dispatch({ type: ActionType.CLOSE_BLOG_DIALOG });
      dispatch({ type: ActionType.SET_CREATE_AGENCY_DONE });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editBLOG = (formData, id) => (dispatch) => {
  axios
    .put("/admin/blog", formData)
    .then((res) => {
      console.log("edit", res.data.data.id);

      dispatch({
        type: ActionType.EDIT_BLOG,
        payload: { data: res.data.data, id },
      });
      dispatch({ type: ActionType.CLOSE_BLOG_DIALOG });
      dispatch({ type: ActionType.SET_UPDATE_AGENCY_DONE });
    })
    .catch((error) => console.log(error));
};

export const deleteBlog = (id) => (dispatch) => {
  apiInstanceFetch
    .delete(`/admin/blog/${id}`)
    .then((res) => {
      console.log("delete", res.data);

      dispatch({ type: BLOG_DELETE_DONE, payload: res.data });
    })
    .catch((error) => console.log(error));
};

export const handleOnlineSwitch = (id) => (dispatch) => {
  axios
    .patch(`/fakeHost/isOnlineSwitch/${id}`)
    .then((res) => {
      dispatch({
        type: ActionType.IS_ONLINE_BLOG,
        payload: res.data.data,
      });
    })
    .catch((error) => console.log(error));
};
