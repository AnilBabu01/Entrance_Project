import {
  GET_PRACTICAL,
  OPEN_PRACTICAL_DIALOG,
  CLOSE_PRACTICAL_DIALOG,
  CREATE_NEW_PRACTICAL,
  EDIT_PRACTICAL,
  SET_CREATE_PRACTICAL_DONE,
  UNSET_CREATE_PRACTICAL_DONE,
  SET_UPDATE_PRACTICAL_DONE,
  UNSET_UPDATE_PRACTICAL_DONE,
  TEST_DELETE_PRACTICAL_DONE,
  UNSET_TEST_DELETE_PRACTICAL_DONE,
  BLOCK_UNBLOCK_PRACTICAL,
} from "./types";

const initialState = {
  agencyWisePRACTICAL: [],
  PRACTICAL: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singlePRACTICAL: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const PRACTICALReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRACTICAL:
      return {
        ...state,
        PRACTICAL: action.payload,
      };
    case CREATE_NEW_PRACTICAL:
      const data = [...state.PRACTICAL];
      data.unshift(action.payload);
      return {
        ...state,
        PRACTICAL: data,
      };
    case EDIT_PRACTICAL:
      return {
        ...state,
        PRACTICAL: state.PRACTICAL.map((PRACTICAL) => {
          if (PRACTICAL.id === action.payload.id) return action.payload.data;
          else return PRACTICAL;
        }),
      };
    case TEST_DELETE_PRACTICAL_DONE:
      return {
        ...state,
        PRACTICAL: state.PRACTICAL.filter((PRACTICAL) => PRACTICAL.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_PRACTICAL_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_PRACTICAL_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_PRACTICAL_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_PRACTICAL_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_PRACTICAL_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_PRACTICAL_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_PRACTICAL:
      return {
        ...state,
        PRACTICAL: state.PRACTICAL.map((PRACTICAL) => {
          if (PRACTICAL?.id === action.payload.id)
            return {
              ...PRACTICAL,
              block: action.payload.block,
            };
          else return PRACTICAL;
        }),
      };
    case CLOSE_PRACTICAL_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default PRACTICALReducer;
