export const initialState = { user: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };

    default:
      console.log("default was fired");
      break;
  }
};

export default reducer;
