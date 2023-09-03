import { getUserPending, getUserSuccess, getUserFail } from "../slices/userSlice";
import { fetchUser } from "../../../api/userApi";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    const result = await fetchUser();

    if (result.email && result.token) {
      return dispatch(getUserSuccess(result));
    }

    dispatch(getUserFail("User is not found"));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};
