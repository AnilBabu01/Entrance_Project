import {
  GET_BlogCategory,
  OPEN_BlogCategory_DIALOG,
  CLOSE_BlogCategory_DIALOG,
  CREATE_NEW_BlogCategory,
  EDIT_BlogCategory,
  SET_CREATE_BlogCategory_DONE,
  UNSET_CREATE_BlogCategory_DONE,
  SET_UPDATE_BlogCategory_DONE,
  UNSET_UPDATE_BlogCategory_DONE,
  TEST_DELETE_BlogCategory_DONE,
  UNSET_TEST_DELETE_BlogCategory_DONE,
  BLOCK_UNBLOCK_BlogCategory,
} from "./types";

const initialState = {
  agencyWiseBlogCategory: [],
  BlogCategory: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleBlogCategory: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const BlogCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BlogCategory:
      return {
        ...state,
        BlogCategory: action.payload,
      };
    case CREATE_NEW_BlogCategory:
      const data = [...state.BlogCategory];
      data.unshift(action.payload);
      return {
        ...state,
        BlogCategory: data,
      };
    case EDIT_BlogCategory:
      return {
        ...state,
        BlogCategory: state.BlogCategory.map((BlogCategory) => {
          if (BlogCategory.id === action.payload.id) return action.payload.data;
          else return BlogCategory;
        }),
      };
    case TEST_DELETE_BlogCategory_DONE:
      return {
        ...state,
        BlogCategory: state.BlogCategory.filter((BlogCategory) => BlogCategory.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_BlogCategory_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_BlogCategory_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_BlogCategory_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_BlogCategory_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_BlogCategory_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_BlogCategory_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_BlogCategory:
      return {
        ...state,
        BlogCategory: state.BlogCategory.map((BlogCategory) => {
          if (BlogCategory?.id === action.payload.id)
            return {
              ...BlogCategory,
              block: action.payload.block,
            };
          else return BlogCategory;
        }),
      };
    case CLOSE_BlogCategory_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default BlogCategoryReducer;
