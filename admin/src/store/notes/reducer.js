import {
  GET_NOTES,
  OPEN_NOTES_DIALOG,
  CLOSE_NOTES_DIALOG,
  CREATE_NEW_NOTES,
  EDIT_NOTES,
  SET_CREATE_NOTES_DONE,
  UNSET_CREATE_NOTES_DONE,
  SET_UPDATE_NOTES_DONE,
  UNSET_UPDATE_NOTES_DONE,
  TEST_DELETE_NOTES_DONE,
  UNSET_TEST_DELETE_NOTES_DONE,
  BLOCK_UNBLOCK_NOTES,
} from "./types";

const initialState = {
  agencyWiseNOTES: [],
  NOTES: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleNOTES: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const NOTESReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        NOTES: action.payload,
      };
    case CREATE_NEW_NOTES:
      const data = [...state.NOTES];
      data.unshift(action.payload);
      return {
        ...state,
        NOTES: data,
      };
    case EDIT_NOTES:
      return {
        ...state,
        NOTES: state.NOTES.map((NOTES) => {
          if (NOTES.id === action.payload.id) return action.payload.data;
          else return NOTES;
        }),
      };
    case TEST_DELETE_NOTES_DONE:
      return {
        ...state,
        NOTES: state.NOTES.filter((NOTES) => NOTES.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_NOTES_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_NOTES_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_NOTES_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_NOTES_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_NOTES_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_NOTES_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_NOTES:
      return {
        ...state,
        NOTES: state.NOTES.map((NOTES) => {
          if (NOTES?.id === action.payload.id)
            return {
              ...NOTES,
              block: action.payload.block,
            };
          else return NOTES;
        }),
      };
    case CLOSE_NOTES_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default NOTESReducer;
