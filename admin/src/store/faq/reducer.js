import {
  GET_FAQ,
  OPEN_FAQ_DIALOG,
  CLOSE_FAQ_DIALOG,
  CREATE_NEW_FAQ,
  EDIT_FAQ,
  SET_CREATE_FAQ_DONE,
  UNSET_CREATE_FAQ_DONE,
  SET_UPDATE_FAQ_DONE,
  UNSET_UPDATE_FAQ_DONE,
  TEST_DELETE_FAQ_DONE,
  UNSET_TEST_DELETE_FAQ_DONE,
  BLOCK_UNBLOCK_FAQ,
} from "./types";

const initialState = {
  agencyWiseFAQ: [],
  FAQ: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleFAQ: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const FAQReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQ:
      return {
        ...state,
        FAQ: action.payload,
      };
    case CREATE_NEW_FAQ:
      const data = [...state.FAQ];
      data.unshift(action.payload);
      return {
        ...state,
        FAQ: data,
      };
    case EDIT_FAQ:
      return {
        ...state,
        FAQ: state.FAQ.map((FAQ) => {
          if (FAQ.id === action.payload.id) return action.payload.data;
          else return FAQ;
        }),
      };
    case TEST_DELETE_FAQ_DONE:
      return {
        ...state,
        FAQ: state.FAQ.filter((FAQ) => FAQ.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_FAQ_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_FAQ_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_FAQ_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_FAQ_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_FAQ_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_FAQ_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_FAQ:
      return {
        ...state,
        FAQ: state.FAQ.map((FAQ) => {
          if (FAQ?.id === action.payload.id)
            return {
              ...FAQ,
              block: action.payload.block,
            };
          else return FAQ;
        }),
      };
    case CLOSE_FAQ_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default FAQReducer;
