import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  events: [],
  event: null,
  success: false,
  message: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RECEIVE_USER_EVENTS:
      console.log(action.payload);
      return {
        ...state,
        events: action.payload,
      };
    case ActionTypes.GET_SINGLE_EVENT:
      return {
        ...state,
        event: action.payload,
      };

    default:
      return state;
  }
}
