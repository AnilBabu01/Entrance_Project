import {
  GET_NOTESUNIT,
  OPEN_NOTESUNIT_DIALOG,
  CLOSE_NOTESUNIT_DIALOG,
  CREATE_NEW_NOTESUNIT,
  EDIT_NOTESUNIT,
  SET_CREATE_NOTESUNIT_DONE,
  UNSET_CREATE_NOTESUNIT_DONE,
  SET_UPDATE_NOTESUNIT_DONE,
  UNSET_UPDATE_NOTESUNIT_DONE,
  TEST_DELETE_NOTESUNIT_DONE,
  UNSET_TEST_DELETE_NOTESUNIT_DONE,
  BLOCK_UNBLOCK_NOTESUNIT,
} from "./types";

const initialState = {
  agencyWiseNOTESUNIT: [],
  NOTESUNIT: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleNOTESUNIT: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const NOTESUNITReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTESUNIT:
      return {
        ...state,
        NOTESUNIT: action.payload,
      };
    case CREATE_NEW_NOTESUNIT:
      const data = [...state.NOTESUNIT];
      data.unshift(action.payload);
      return {
        ...state,
        NOTESUNIT: data,
      };
    case EDIT_NOTESUNIT:
      return {
        ...state,
        NOTESUNIT: state.NOTESUNIT.map((NOTESUNIT) => {
          if (NOTESUNIT.id === action.payload.id) return action.payload.data;
          else return NOTESUNIT;
        }),
      };
    case TEST_DELETE_NOTESUNIT_DONE:
      return {
        ...state,
        NOTESUNIT: state.NOTESUNIT.filter((NOTESUNIT) => NOTESUNIT.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_NOTESUNIT_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_NOTESUNIT_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_NOTESUNIT_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_NOTESUNIT_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_NOTESUNIT_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_NOTESUNIT_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_NOTESUNIT:
      return {
        ...state,
        NOTESUNIT: state.NOTESUNIT.map((NOTESUNIT) => {
          if (NOTESUNIT?.id === action.payload.id)
            return {
              ...NOTESUNIT,
              block: action.payload.block,
            };
          else return NOTESUNIT;
        }),
      };
    case CLOSE_NOTESUNIT_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default NOTESUNITReducer;
