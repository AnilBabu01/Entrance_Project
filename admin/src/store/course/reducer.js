import {
  GET_COURSE,
  OPEN_COURSE_DIALOG,
  CLOSE_COURSE_DIALOG,
  CREATE_NEW_COURSE,
  EDIT_COURSE,
  SET_CREATE_COURSE_DONE,
  UNSET_CREATE_COURSE_DONE,
  SET_UPDATE_COURSE_DONE,
  UNSET_UPDATE_COURSE_DONE,
  TEST_DELETE_COURSE_DONE,
  UNSET_TEST_DELETE_COURSE_DONE,
  BLOCK_UNBLOCK_COURSE,
} from "./types";

const initialState = {
  agencyWiseCOURSE: [],
  COURSE: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleCOURSE: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const COURSEReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE:
      return {
        ...state,
        COURSE: action.payload,
      };
    case CREATE_NEW_COURSE:
      const data = [...state.COURSE];
      data.unshift(action.payload);
      return {
        ...state,
        COURSE: data,
      };
    case EDIT_COURSE:
      return {
        ...state,
        COURSE: state.COURSE.map((COURSE) => {
          if (COURSE.id === action.payload.id) return action.payload.data;
          else return COURSE;
        }),
      };
    case TEST_DELETE_COURSE_DONE:
      return {
        ...state,
        COURSE: state.COURSE.filter((COURSE) => COURSE.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_COURSE_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_COURSE_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_COURSE_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_COURSE_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_COURSE_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_COURSE_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_COURSE:
      return {
        ...state,
        COURSE: state.COURSE.map((COURSE) => {
          if (COURSE?.id === action.payload.id)
            return {
              ...COURSE,
              block: action.payload.block,
            };
          else return COURSE;
        }),
      };
    case CLOSE_COURSE_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default COURSEReducer;
