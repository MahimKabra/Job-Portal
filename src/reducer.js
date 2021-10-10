export const initialState = { user: null, userData: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      if (action.payload) {
        return {
          ...state,
          user: action.payload,
        };
      } else {
        return {
          user: null,
          userData: null,
        };
      }
    case "setUserData":
      return {
        ...state,
        userData: action.payload,
      };

    default:
      console.log("default was fired");
      break;
  }
};

export default reducer;
