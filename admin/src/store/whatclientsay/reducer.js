import {
  GET_WHATCLIENTSAY,
  OPEN_WHATCLIENTSAY_DIALOG,
  CLOSE_WHATCLIENTSAY_DIALOG,
  CREATE_NEW_WHATCLIENTSAY,
  EDIT_WHATCLIENTSAY,
  SET_CREATE_WHATCLIENTSAY_DONE,
  UNSET_CREATE_WHATCLIENTSAY_DONE,
  SET_UPDATE_WHATCLIENTSAY_DONE,
  UNSET_UPDATE_WHATCLIENTSAY_DONE,
  TEST_DELETE_WHATCLIENTSAY_DONE,
  UNSET_TEST_DELETE_WHATCLIENTSAY_DONE,
  BLOCK_UNBLOCK_WHATCLIENTSAY,
} from "./types";

const initialState = {
  agencyWiseWHATCLIENTSAY: [],
  WHATCLIENTSAY: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleWHATCLIENTSAY: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const WHATCLIENTSAYReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WHATCLIENTSAY:
      return {
        ...state,
        WHATCLIENTSAY: action.payload,
      };
    case CREATE_NEW_WHATCLIENTSAY:
      const data = [...state.WHATCLIENTSAY];
      data.unshift(action.payload);
      return {
        ...state,
        WHATCLIENTSAY: data,
      };
    case EDIT_WHATCLIENTSAY:
      return {
        ...state,
        WHATCLIENTSAY: state.WHATCLIENTSAY.map((WHATCLIENTSAY) => {
          if (WHATCLIENTSAY.id === action.payload.id) return action.payload.data;
          else return WHATCLIENTSAY;
        }),
      };
    case TEST_DELETE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        WHATCLIENTSAY: state.WHATCLIENTSAY.filter((WHATCLIENTSAY) => WHATCLIENTSAY.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_WHATCLIENTSAY_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_WHATCLIENTSAY_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_WHATCLIENTSAY:
      return {
        ...state,
        WHATCLIENTSAY: state.WHATCLIENTSAY.map((WHATCLIENTSAY) => {
          if (WHATCLIENTSAY?.id === action.payload.id)
            return {
              ...WHATCLIENTSAY,
              block: action.payload.block,
            };
          else return WHATCLIENTSAY;
        }),
      };
    case CLOSE_WHATCLIENTSAY_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default WHATCLIENTSAYReducer;
