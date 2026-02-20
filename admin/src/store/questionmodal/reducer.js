import {
  GET_QUESTIONMODAL,
  OPEN_QUESTIONMODAL_DIALOG,
  CLOSE_QUESTIONMODAL_DIALOG,
  CREATE_NEW_QUESTIONMODAL,
  EDIT_QUESTIONMODAL,
  SET_CREATE_QUESTIONMODAL_DONE,
  UNSET_CREATE_QUESTIONMODAL_DONE,
  SET_UPDATE_QUESTIONMODAL_DONE,
  UNSET_UPDATE_QUESTIONMODAL_DONE,
  TEST_DELETE_QUESTIONMODAL_DONE,
  UNSET_TEST_DELETE_QUESTIONMODAL_DONE,
  BLOCK_UNBLOCK_QUESTIONMODAL,
} from "./types";

const initialState = {
  agencyWiseQUESTIONMODAL: [],
  QUESTIONMODAL: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleQUESTIONMODAL: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const QUESTIONMODALReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONMODAL:
      return {
        ...state,
        QUESTIONMODAL: action.payload,
      };
    case CREATE_NEW_QUESTIONMODAL:
      const data = [...state.QUESTIONMODAL];
      data.unshift(action.payload);
      return {
        ...state,
        QUESTIONMODAL: data,
      };
    case EDIT_QUESTIONMODAL:
      return {
        ...state,
        QUESTIONMODAL: state.QUESTIONMODAL.map((QUESTIONMODAL) => {
          if (QUESTIONMODAL.id === action.payload.id) return action.payload.data;
          else return QUESTIONMODAL;
        }),
      };
    case TEST_DELETE_QUESTIONMODAL_DONE:
      return {
        ...state,
        QUESTIONMODAL: state.QUESTIONMODAL.filter((QUESTIONMODAL) => QUESTIONMODAL.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_QUESTIONMODAL_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_QUESTIONMODAL_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_QUESTIONMODAL_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_QUESTIONMODAL_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_QUESTIONMODAL_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_QUESTIONMODAL_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_QUESTIONMODAL:
      return {
        ...state,
        QUESTIONMODAL: state.QUESTIONMODAL.map((QUESTIONMODAL) => {
          if (QUESTIONMODAL?.id === action.payload.id)
            return {
              ...QUESTIONMODAL,
              block: action.payload.block,
            };
          else return QUESTIONMODAL;
        }),
      };
    case CLOSE_QUESTIONMODAL_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default QUESTIONMODALReducer;
