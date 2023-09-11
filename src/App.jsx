import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PathConstants from "./constants/pathConstants";
import DashboardLayout from "./layouts/DashBoardLayout";

import SignIn from "./pages/Common/SignIn";
import SignUp from "./pages/Common/SignUp";
import Lock from "./pages/Common/Lock";
import PageNotFound from "./pages/Common/PageNotFound";

import Checkout from "./pages/Sales/Checkout";
import Receipts from "./pages/Sales/Receipts";
import Refund from "./components/Receipts/Refund";

import CustomerList from "./pages/Customer/CustomerList/CustomerList";
import PurchaseHistory from "./pages/Customer/CustomerList/PurchaseHistory";
import EditCustomer from "./pages/Customer/CustomerList/EditCustomer";
import AddCustomer from "./pages/Customer/CustomerList/AddCustomer";

import LoyaltyProgramList from "./pages/Customer/LoyaltyProgram/LoyaltyProgramList";
import AddLoyaltyProgram from "./pages/Customer/LoyaltyProgram/AddLoyaltyProgram";
import EditLoyaltyProgram from "./pages/Customer/LoyaltyProgram/EditLLoyaltyProgram";

import EmployeeList from "./pages/Employee/EmployeeList/EmployeeList";
import AddEmployee from "./pages/Employee/EmployeeList/AddEmployee";
import EditEmployee from "./pages/Employee/EmployeeList/EditEmployee";
import Timecards from "./pages/Employee/Timecards/Timecards";
import AddTimeCard from "./pages/Employee/Timecards/AddTimecard";
import EditTimeCard from "./pages/Employee/Timecards/EditTimecard";
import Categories from "./pages/Items/Categories/Categories";
import AddCategory from "./pages/Items/Categories/AddCategory";
import EditCategory from "./pages/Items/Categories/EditCategory";
import ItemList from "./pages/Items/ItemList/ItemList";

function App() {
  // defining routes for the application using react router
  return (
    <BrowserRouter>
      <Routes>
        {/* Common */}
        <Route path={PathConstants.SIGN_IN} element={<SignIn />} />
        <Route path={PathConstants.SIGN_UP} element={<SignUp />} />
        <Route path={PathConstants.LOCK} element={<Lock />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path={PathConstants.HOME} element={<DashboardLayout />}>
          {/* Sales */}
          <Route path={PathConstants.CHECKOUT} element={<Checkout />} />
          <Route path={PathConstants.RECEIPTS} element={<Receipts />} />
          <Route path={PathConstants.REFUND} element={<Refund />} />
          {/* Customers */}
          <Route path={PathConstants.ADD_CUSTOMER} element={<AddCustomer />} />
          <Route path={PathConstants.CUSTOMER_LIST} element={<CustomerList />} />
          <Route path={PathConstants.EDIT_CUSTOMER} element={<EditCustomer />} />
          <Route path={PathConstants.PURCHASE_HISTORY} element={<PurchaseHistory />} />

          <Route path={PathConstants.LOYALTY_PROGRAMS} element={<LoyaltyProgramList />} />
          <Route path={PathConstants.ADD_LOYALTY_PROGRAM} element={<AddLoyaltyProgram />} />
          <Route path={PathConstants.EDIT_LOYALTY_PROGRAM} element={<EditLoyaltyProgram />} />
          {/* Employees */}
          <Route path={PathConstants.ADD_EMPLOYEE} element={<AddEmployee />} />
          <Route path={PathConstants.EMPLOYEE_LIST} element={<EmployeeList />} />
          <Route path={PathConstants.EDIT_EMPLOYEE} element={<EditEmployee />} />
          <Route path={PathConstants.EDIT_EMPLOYEE} element={<EditEmployee />} />

          <Route path={PathConstants.TIMECARDS} element={<Timecards />} />
          <Route path={PathConstants.ADD_TIMECARD} element={<AddTimeCard />} />
          <Route path={PathConstants.EDIT_TIMECARD} element={<EditTimeCard />} />

          <Route path={PathConstants.CATEGORIES} element={<Categories />} />
          <Route path={PathConstants.ADD_CATEGORY} element={<AddCategory />} />
          <Route path={PathConstants.EDIT_CATEGORY} element={<EditCategory />} />
          <Route path={PathConstants.ITEM_LIST} element={<ItemList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
