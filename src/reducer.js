export const initialState = { user: null, userData: null, profilePic: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    case "setUserData":
      return {
        ...state,
        userData: action.payload,
      };

    case "getProfilePic":
      return {
        ...state,
        profilePic: action.payload,
      };

    default:
      console.log("default was fired");
      break;
  }
};

export default reducer;
