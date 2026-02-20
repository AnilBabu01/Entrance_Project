import {
  GET_SYLLABUS,
  OPEN_SYLLABUS_DIALOG,
  CLOSE_SYLLABUS_DIALOG,
  CREATE_NEW_SYLLABUS,
  EDIT_SYLLABUS,
  SET_CREATE_SYLLABUS_DONE,
  UNSET_CREATE_SYLLABUS_DONE,
  SET_UPDATE_SYLLABUS_DONE,
  UNSET_UPDATE_SYLLABUS_DONE,
  TEST_DELETE_SYLLABUS_DONE,
  UNSET_TEST_DELETE_SYLLABUS_DONE,
  BLOCK_UNBLOCK_SYLLABUS,
} from "./types";

const initialState = {
  agencyWiseSYLLABUS: [],
  SYLLABUS: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleSYLLABUS: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const SYLLABUSReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SYLLABUS:
      return {
        ...state,
        SYLLABUS: action.payload,
      };
    case CREATE_NEW_SYLLABUS:
      const data = [...state.SYLLABUS];
      data.unshift(action.payload);
      return {
        ...state,
        SYLLABUS: data,
      };
    case EDIT_SYLLABUS:
      return {
        ...state,
        SYLLABUS: state.SYLLABUS.map((SYLLABUS) => {
          if (SYLLABUS.id === action.payload.id) return action.payload.data;
          else return SYLLABUS;
        }),
      };
    case TEST_DELETE_SYLLABUS_DONE:
      return {
        ...state,
        SYLLABUS: state.SYLLABUS.filter((SYLLABUS) => SYLLABUS.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_SYLLABUS_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_SYLLABUS_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_SYLLABUS_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_SYLLABUS_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_SYLLABUS_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_SYLLABUS_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_SYLLABUS:
      return {
        ...state,
        SYLLABUS: state.SYLLABUS.map((SYLLABUS) => {
          if (SYLLABUS?.id === action.payload.id)
            return {
              ...SYLLABUS,
              block: action.payload.block,
            };
          else return SYLLABUS;
        }),
      };
    case CLOSE_SYLLABUS_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default SYLLABUSReducer;
