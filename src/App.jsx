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
import Customer from "./pages/Customer";
import CustomerList from "./components/Customer/CustomerList";
import EditCustomer from "./components/Customer/EditCustomer";

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
          <Route path={PathConstants.ADD_CUSTOMER} element={<Customer />} />
          <Route path={PathConstants.CUSTOMER_LIST} element={<CustomerList />} />
          <Route path={PathConstants.EDIT_CUSTOMER} element={<EditCustomer />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
