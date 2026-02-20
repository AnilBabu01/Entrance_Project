import * as ActionType from "./types";
import {
  BLOG_DELETE_DONE,
  UNSET_BLOG_DELETE_DONE,
  BLOCK_UNBLOCK_BLOG,
} from "../../store/blog/types";

const initialState = {
  BLOG: [],
  total: null,
  dialog: false,
  dialogData: null,
  analytic: [],
  totalCoin: {},
  createDone: false,
  updateDone: false,
  deleteDone: false,
};

const BLOGReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ALL_BLOG:
      return {
        ...state,
        BLOG: action.payload.data,
        total: action.payload.total,
      };

    case ActionType.CREATE_NEW_BLOG:
      const data = [...state.BLOG];
      data.unshift(action.payload);
      return {
        ...state,
        BLOG: data,
      };

    case ActionType.EDIT_BLOG:
      return {
        ...state,
        BLOG: state.BLOG.map((BLOG) => {
          if (BLOG.id === action.payload.id) return action.payload.data;
          else return BLOG;
        }),
      };
    case BLOG_DELETE_DONE:
      return {
        ...state,
        BLOG: state.BLOG.filter((BLOG) => BLOG.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_BLOG_DELETE_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case BLOCK_UNBLOCK_BLOG:
      return {
        ...state,
        BLOG: state.BLOG.map((BLOG) => {
          if (BLOG?.id === action.payload.id)
            return {
              ...BLOG,
              block: action.payload.block,
            };
          else return BLOG;
        }),
      };
    case ActionType.OPEN_BLOG_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case ActionType.CLOSE_BLOG_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };

    case ActionType.SET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case ActionType.UNSET_CREATE_AGENCY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case ActionType.SET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case ActionType.UNSET_UPDATE_AGENCY_DONE:
      return {
        ...state,
        updateDone: false,
      };

    case ActionType.IS_ONLINE_BLOG:
      return {
        ...state,
        BLOG: {
          ...state,
          isLive: action.payload.isLive,
        },
      };

    default:
      return state;
  }
};

export default BLOGReducer;
