import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import PathConstants from "../constants/pathConstants";

const ProtectedRoutes = ({ roles }) => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    if (roles.includes(userRole)) {
      return <Outlet />;
    } else {
      return <Navigate to={`${PathConstants.SIGN_IN}`} />;
    }
  } else {
    return <Navigate to={`${PathConstants.SIGN_IN}`} />;
  }
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ProtectedRoutes;
