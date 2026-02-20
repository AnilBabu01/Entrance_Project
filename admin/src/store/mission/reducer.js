import {
  GET_MISSION,
  OPEN_MISSION_DIALOG,
  CLOSE_MISSION_DIALOG,
  CREATE_NEW_MISSION,
  EDIT_MISSION,
  SET_CREATE_MISSION_DONE,
  UNSET_CREATE_MISSION_DONE,
  SET_UPDATE_MISSION_DONE,
  UNSET_UPDATE_MISSION_DONE,
  TEST_DELETE_MISSION_DONE,
  UNSET_TEST_DELETE_MISSION_DONE,
  BLOCK_UNBLOCK_MISSION,
} from "./types";

const initialState = {
  agencyWiseMISSION: [],
  MISSION: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleMISSION: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const MISSIONReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MISSION:
      return {
        ...state,
        MISSION: action.payload,
      };
    case CREATE_NEW_MISSION:
      const data = [...state.MISSION];
      data.unshift(action.payload);
      return {
        ...state,
        MISSION: data,
      };
    case EDIT_MISSION:
      return {
        ...state,
        MISSION: state.MISSION.map((MISSION) => {
          if (MISSION.id === action.payload.id) return action.payload.data;
          else return MISSION;
        }),
      };
    case TEST_DELETE_MISSION_DONE:
      return {
        ...state,
        MISSION: state.MISSION.filter((MISSION) => MISSION.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_MISSION_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_MISSION_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_MISSION_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_MISSION_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_MISSION_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_MISSION_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case BLOCK_UNBLOCK_MISSION:
      return {
        ...state,
        MISSION: state.MISSION.map((MISSION) => {
          if (MISSION?.id === action.payload.id)
            return {
              ...MISSION,
              block: action.payload.block,
            };
          else return MISSION;
        }),
      };
    case CLOSE_MISSION_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    default:
      return state;
  }
};

export default MISSIONReducer;
