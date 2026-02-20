import {
  GET_BOOK,
  OPEN_BOOK_DIALOG,
  CLOSE_BOOK_DIALOG,
  CREATE_NEW_BOOK,
  EDIT_BOOK,
  SET_CREATE_BOOK_DONE,
  UNSET_CREATE_BOOK_DONE,
  SET_UPDATE_BOOK_DONE,
  UNSET_UPDATE_BOOK_DONE,
  TEST_DELETE_BOOK_DONE,
  UNSET_TEST_DELETE_BOOK_DONE,
  BLOCK_UNBLOCK_BOOK,
} from "./types";

const initialState = {
  agencyWiseBOOK: [],
  BOOK: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleBOOK: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const BOOKReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK:
      return {
        ...state,
        BOOK: action.payload,
      };
    case CREATE_NEW_BOOK:
      const data = [...state.BOOK];
      data.unshift(action.payload);
      return {
        ...state,
        BOOK: data,
      };
    case EDIT_BOOK:
      return {
        ...state,
        BOOK: state.BOOK.map((BOOK) => {
          if (BOOK.id === action.payload.id) return action.payload.data;
          else return BOOK;
        }),
      };
    case TEST_DELETE_BOOK_DONE:
      return {
        ...state,
        BOOK: state.BOOK.filter((BOOK) => BOOK.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_BOOK_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_BOOK_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_BOOK_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_BOOK_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_BOOK_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_BOOK_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_BOOK:
      return {
        ...state,
        BOOK: state.BOOK.map((BOOK) => {
          if (BOOK?.id === action.payload.id)
            return {
              ...BOOK,
              block: action.payload.block,
            };
          else return BOOK;
        }),
      };
    case CLOSE_BOOK_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default BOOKReducer;
