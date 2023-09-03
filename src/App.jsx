import "./App.css";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Lock from "./pages/Lock";
import DashboardLayout from "./layouts/DashBoardLayout";
import PathConstants from "./constants/pathConstants";
function App() {
  // defining routes for the application using react router
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathConstants.SIGN_IN} element={<SignIn />} />
        <Route path={PathConstants.SIGN_UP} element={<SignUp />} />
        <Route path={PathConstants.HOME} element={<DashboardLayout />}>
          <Route path={PathConstants.LOCK} element={<Lock />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
