import {
  GET_HOST,
  BLOCK_UNBLOCK_HOST,
  TEST_DELETE_CATEGORY_DONE,
  UNSET_TEST_DELETE_CATEGORY_DONE,
  OPEN_HOST_DIALOG,
  CLOSE_HOST_DIALOG,
  CREATE_NEW_HOST,
  EDIT_HOST,
  SET_CREATE_HOST_DONE,
  UNSET_CREATE_HOST_DONE,
  SET_UPDATE_HOST_DONE,
  UNSET_UPDATE_HOST_DONE,
  GET_HOST_ANALYTIC,
  GET_SINGLE_HOST_DATA,
  GET_TOTAL_COIN_OF_ANALYTIC,
  GET_LIVE_STREAMING_ANALYTIC,
  GET_LIVE_STREAMING_COIN,
  EXTRA_BONUS,
  GET_AGENCY_WISE_HOST,
  GET_HOST_PROFILE,
} from "./types";

const initialState = {
  agencyWiseHost: [],
  host: [],
  dialog: false,
  dialogData: null,
  createDone: false,
  updateDone: false,
  deleteDone: false,
  analytic: [],
  singleHost: {},
  totalCoin: {},
  liveStreamingAnalytic: [],
  liveStreamingCoin: null,
  profile: {},
};

const hostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENCY_WISE_HOST:
      return {
        ...state,
        agencyWiseHost: action.payload,
      };

    case GET_HOST_PROFILE:
      debugger;
      return {
        ...state,
        singleHost: action.payload,
      };
    case GET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case BLOCK_UNBLOCK_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host?.id === action.payload.id)
            return {
              ...host,
              block: action.payload.block,
            };
          else return host;
        }),
      };
    case EXTRA_BONUS:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host.id === action.payload.id)
            return {
              ...host,
              bonusSwitch: action.payload.bonusSwitch,
            };
          else return host;
        }),
      };
    case CREATE_NEW_HOST:
      const data = [...state.host];
      data.unshift(action.payload);
      return {
        ...state,
        host: data,
      };
    case EDIT_HOST:
      return {
        ...state,
        host: state.host.map((host) => {
          if (host.id === action.payload.id) return action.payload.data;
          else return host;
        }),
      };
    case TEST_DELETE_CATEGORY_DONE:
      return {
        ...state,
        host: state.host.filter((host) => host.id !== action.payload),
        deleteDone: true,
      };
    case UNSET_TEST_DELETE_CATEGORY_DONE:
      return {
        ...state,
        deleteDone: false,
      };
    case SET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: true,
      };
    case UNSET_CREATE_HOST_DONE:
      return {
        ...state,
        createDone: false,
      };
    case SET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: true,
      };
    case UNSET_UPDATE_HOST_DONE:
      return {
        ...state,
        updateDone: false,
      };
    case OPEN_HOST_DIALOG:
      return {
        ...state,
        dialog: true,
        dialogData: action.payload || null,
      };
    case CLOSE_HOST_DIALOG:
      return {
        ...state,
        dialog: false,
        dialogData: null,
      };
    case GET_HOST_ANALYTIC:
      return {
        ...state,
        analytic: action.payload,
      };

    case GET_LIVE_STREAMING_ANALYTIC:
      return {
        ...state,
        liveStreamingAnalytic: action.payload,
      };
    case GET_TOTAL_COIN_OF_ANALYTIC:
      return {
        ...state,
        totalCoin: action.payload,
      };
    case GET_LIVE_STREAMING_COIN:
      return {
        ...state,
        liveStreamingCoin: action.payload,
      };
    case GET_SINGLE_HOST_DATA:
      return {
        ...state,
        singleHost: action.payload,
      };
    default:
      return state;
  }
};

export default hostReducer;
