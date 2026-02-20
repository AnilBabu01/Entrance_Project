import {
  GET_SUBJECT,
  OPEN_SUBJECT_DIALOG,
  CLOSE_SUBJECT_DIALOG,
  CREATE_NEW_SUBJECT,
  EDIT_SUBJECT,
  SET_CREATE_SUBJECT_DONE,
  UNSET_CREATE_SUBJECT_DONE,
  SET_UPDATE_SUBJECT_DONE,
  UNSET_UPDATE_SUBJECT_DONE,
  TEST_DELETE_SUBJECT_DONE,
  UNSET_TEST_DELETE_SUBJECT_DONE,
  BLOCK_UNBLOCK_SUBJECT,
  GET_SUBJECT_BY_COURSE_ID_SEM_ID,
} from "./types";

const initialState = {
  agencyWiseSUBJECT: [],
  SUBJECT: [],
  SUBJECTLIST:[],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleSUBJECT: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const SUBJECTReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT:
      return {
        ...state,
        SUBJECT: action.payload,
      };
    case GET_SUBJECT_BY_COURSE_ID_SEM_ID:
      return {
        ...state,
        SUBJECTLIST: action.payload,
      };
    case CREATE_NEW_SUBJECT:
      const data = [...state.SUBJECT];
      data.unshift(action.payload);
      return {
        ...state,
        SUBJECT: data,
      };
    case EDIT_SUBJECT:
      return {
        ...state,
        SUBJECT: state.SUBJECT.map((SUBJECT) => {
          if (SUBJECT.id === action.payload.id) return action.payload.data;
          else return SUBJECT;
        }),
      };
    case TEST_DELETE_SUBJECT_DONE:
      return {
        ...state,
        SUBJECT: state.SUBJECT.filter(
          (SUBJECT) => SUBJECT.id !== action.payload
        ),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_SUBJECT_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_SUBJECT_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_SUBJECT_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_SUBJECT_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_SUBJECT_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_SUBJECT_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_SUBJECT:
      return {
        ...state,
        SUBJECT: state.SUBJECT.map((SUBJECT) => {
          if (SUBJECT?.id === action.payload.id)
            return {
              ...SUBJECT,
              block: action.payload.block,
            };
          else return SUBJECT;
        }),
      };
    case CLOSE_SUBJECT_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default SUBJECTReducer;
