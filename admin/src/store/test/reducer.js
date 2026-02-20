import {
  GET_TEST,
  OPEN_TEST_DIALOG,
  CLOSE_TEST_DIALOG,
  CREATE_NEW_TEST,
  EDIT_TEST,
  SET_CREATE_TEST_DONE,
  UNSET_CREATE_TEST_DONE,
  SET_UPDATE_TEST_DONE,
  UNSET_UPDATE_TEST_DONE,
  TEST_DELETE_TEST_DONE,
  UNSET_TEST_DELETE_TEST_DONE,
  BLOCK_UNBLOCK_TEST,
} from "./types";

const initialState = {
  agencyWiseTEST: [],
  TEST: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleTEST: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const TESTReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST:
      return {
        ...state,
        TEST: action.payload,
      };
    case CREATE_NEW_TEST:
      const data = [...state.TEST];
      data.unshift(action.payload);
      return {
        ...state,
        TEST: data,
      };
    case EDIT_TEST:
      return {
        ...state,
        TEST: state.TEST.map((TEST) => {
          if (TEST.id === action.payload.id) return action.payload.data;
          else return TEST;
        }),
      };
    case TEST_DELETE_TEST_DONE:
      return {
        ...state,
        TEST: state.TEST.filter((TEST) => TEST.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_TEST_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_TEST_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_TEST_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_TEST_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_TEST_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_TEST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_TEST:
      return {
        ...state,
        TEST: state.TEST.map((TEST) => {
          if (TEST?.id === action.payload.id)
            return {
              ...TEST,
              block: action.payload.block,
            };
          else return TEST;
        }),
      };
    case CLOSE_TEST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default TESTReducer;
