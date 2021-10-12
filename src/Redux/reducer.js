const initialState = {
  userId: 0,
};

const UPDATE_USER_ID = "UPDATE_USER_ID";
const CLEAR_REDUX_STATE = "CLEAR_REDUX_STORE";

export const updateUserId = (userid) => {
  return {
    type: UPDATE_USER_ID,
    payload: userid,
  };
};

export const clearReduxState = () => {
  return {
    type: CLEAR_REDUX_STATE,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ID: {
      return {
        ...state,
        userId: action.payload,
      };
    }
    case CLEAR_REDUX_STATE: {
      return {
        ...state,
        userId: 0,
        username: "",
      };
    }
    default:
      return state;
  }
};

export default reducer;
