import "./App.css";
import SignIn from "./pages/SignIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Lock from "./pages/Lock";
import DashboardLayout from "./layouts/DashBoardLayout";
import PathConstants from "./constants/pathConstants";
import PageNotFound from "./pages/PageNotFound";
import Checkout from "./pages/sales/Checkout";
import Refund from "./components/Receipts/Refund";
import Receipts from "./pages/Sales/Receipts";
import CustomerList from "./pages/Customer/CustomerList";
import EditCustomer from "./pages/Customer/EditCustomer";
import AddCustomer from "./pages/Customer/AddCustomer";
import AddEmployee from "./pages/Employee/AddEmployee";
import EmployeeList from "./pages/Employee/EmployeeList";
import EditEmployee from "./pages/Employee/EditEmployee";
import PurchaseHistory from "./pages/Customer/PurchaseHistory";
import LoyaltyProgramList from "./pages/Customer/LoyaltyProgram/LoyaltyProgramList";
import AddLoyaltyProgram from "./pages/Customer/LoyaltyProgram/AddLoyaltyProgram";
import EditLoyaltyProgram from "./pages/Customer/LoyaltyProgram/EditLLoyaltyProgram";

function App() {
  // defining routes for the application using react router
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathConstants.SIGN_IN} element={<SignIn />} />
        <Route path={PathConstants.SIGN_UP} element={<SignUp />} />
        <Route path={PathConstants.LOCK} element={<Lock />} />
        <Route path={PathConstants.HOME} element={<DashboardLayout />}>
          <Route path={PathConstants.CHECKOUT} element={<Checkout />} />
          <Route path={PathConstants.RECEIPTS} element={<Receipts />} />
          <Route path={PathConstants.REFUND} element={<Refund />} />
          <Route path={PathConstants.ADD_CUSTOMER} element={<AddCustomer />} />
          <Route path={PathConstants.CUSTOMER_LIST} element={<CustomerList />} />
          <Route path={PathConstants.EDIT_CUSTOMER} element={<EditCustomer />} />
          <Route path={PathConstants.PURCHASE_HISTORY} element={<PurchaseHistory />} />
          <Route path={PathConstants.ADD_EMPLOYEE} element={<AddEmployee />} />
          <Route path={PathConstants.EMPLOYEE_LIST} element={<EmployeeList />} />
          <Route path={PathConstants.EDIT_EMPLOYEE} element={<EditEmployee />} />
          <Route path={PathConstants.LOYALTY_PROGRAMS} element={<LoyaltyProgramList />} />
          <Route path={PathConstants.ADD_LOYALTY_PROGRAM} element={<AddLoyaltyProgram />} />
          <Route path={PathConstants.EDIT_LOYALTY_PROGRAM} element={<EditLoyaltyProgram />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
