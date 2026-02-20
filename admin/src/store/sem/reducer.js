import {
  GET_SEM,
  OPEN_SEM_DIALOG,
  CLOSE_SEM_DIALOG,
  CREATE_NEW_SEM,
  EDIT_SEM,
  SET_CREATE_SEM_DONE,
  UNSET_CREATE_SEM_DONE,
  SET_UPDATE_SEM_DONE,
  UNSET_UPDATE_SEM_DONE,
  TEST_DELETE_SEM_DONE,
  UNSET_TEST_DELETE_SEM_DONE,
  BLOCK_UNBLOCK_SEM,
  GET_SEM_BY_COURSE_ID,
  ERROR,
} from "./types";

const initialState = {
  agencyWiseSEM: [],
  SEM: [],
  SEMLIST: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  error: null,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleSEM: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const SEMReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEM:
      return {
        ...state,
        SEM: action.payload,
      };
    case GET_SEM_BY_COURSE_ID:
      return {
        ...state,
        SEMLIST: action.payload,
      };
    case CREATE_NEW_SEM:
      const data = [...state.SEM];
      data.unshift(action.payload);
      return {
        ...state,
        SEM: data,
      };
    case ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case EDIT_SEM:
      return {
        ...state,
        SEM: state.SEM.map((SEM) => {
          if (SEM.id === action.payload.id) return action.payload.data;
          else return SEM;
        }),
      };
    case TEST_DELETE_SEM_DONE:
      return {
        ...state,
        SEM: state.SEM.filter((SEM) => SEM.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_SEM_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_SEM_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_SEM_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_SEM_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_SEM_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_SEM_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_SEM:
      return {
        ...state,
        SEM: state.SEM.map((SEM) => {
          if (SEM?.id === action.payload.id)
            return {
              ...SEM,
              block: action.payload.block,
            };
          else return SEM;
        }),
      };
    case CLOSE_SEM_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default SEMReducer;
