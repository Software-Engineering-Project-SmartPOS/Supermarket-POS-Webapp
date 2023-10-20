import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PathConstants from "./constants/pathConstants";
import DashboardLayout from "./layouts/DashboardLayout";

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
import AddItem from "./pages/Items/ItemList/AddItem";
import EditItem from "./pages/Items/ItemList/EditItem";

import Brands from "./pages/Items/Brands/Brands";
import AddBrand from "./pages/Items/Brands/AddBrand";
import EditBrand from "./pages/Items/Brands/EditBrand";

import Suppliers from "./pages/Inventory/Suppliers/Suppliers";
import AddSupplier from "./pages/Inventory/Suppliers/AddSupplier";
import EditSupplier from "./pages/Inventory/Suppliers/EditSupplier";

import PurchaseOrders from "./pages/Inventory/PurchaseOrder/PurchaseOrders";
import AddPurchaseOrder from "./pages/Inventory/PurchaseOrder/AddPurchaseOrder";
import EditPurchaseOrder from "./pages/Inventory/PurchaseOrder/EditPurchaseOrder";
import ProtectedRoutes from "./utils/protectedRoutes";
import OwnerProfile from "./pages/Common/OwnerProfile";
import AddBranch from "./pages/Account/StoreList/AddBranch";
import BranchList from "./pages/Account/StoreList/BranchList";
import AddSalaryType from "./pages/Employee/Salary/AddSalaryType";
import SalaryTypes from "./pages/Employee/Salary/SalaryTypes";
import EditBranch from "./pages/Account/StoreList/EditBranch";

function App() {
  // defining routes for the application using react router
  return (
    <BrowserRouter>
      <Routes>
        {/* Common */}
        <Route path={PathConstants.SIGN_IN} element={<SignIn />} />
        <Route path={PathConstants.SIGN_UP} element={<SignUp />} />
        <Route path={PathConstants.LOCK} element={<Lock />} />
        <Route path={PathConstants.OWNER_PROFILE} element={<OwnerProfile />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoutes roles={["OWNER", "ADMIN"]} />}>
          <Route element={<DashboardLayout />}>
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
            <Route path={PathConstants.EDIT_EMPLOYEE + "/:id"} element={<EditEmployee />} />
            {/* Salary */}
            <Route path={PathConstants.ADD_SALARY_TYPE} element={<AddSalaryType />} />
            <Route path={PathConstants.SALARY_TYPES} element={<SalaryTypes />} />

            {/* Timecards */}
            <Route path={PathConstants.TIMECARDS} element={<Timecards />} />
            <Route path={PathConstants.ADD_TIMECARD} element={<AddTimeCard />} />
            <Route path={PathConstants.EDIT_TIMECARD} element={<EditTimeCard />} />
            {/* Categories */}
            <Route path={PathConstants.CATEGORIES} element={<Categories />} />
            <Route path={PathConstants.ADD_CATEGORY} element={<AddCategory />} />
            <Route path={PathConstants.EDIT_CATEGORY + "/:id"} element={<EditCategory />} />
            {/* ItemList */}
            <Route path={PathConstants.ITEM_LIST} element={<ItemList />} />
            <Route path={PathConstants.ADD_ITEM} element={<AddItem />} />
            <Route path={PathConstants.EDIT_ITEM} element={<EditItem />} />
            {/* Brands */}
            <Route path={PathConstants.BRANDS} element={<Brands />} />
            <Route path={PathConstants.ADD_BRAND} element={<AddBrand />} />
            <Route path={PathConstants.EDIT_BRAND + "/:id"} element={<EditBrand />} />
            {/* Suppliers */}
            <Route path={PathConstants.SUPPLIERS} element={<Suppliers />} />
            <Route path={PathConstants.ADD_SUPPLIER} element={<AddSupplier />} />
            <Route path={PathConstants.EDIT_SUPPLIER + "/:id"} element={<EditSupplier />} />
            {/* Purchase Orders */}
            <Route path={PathConstants.PURCHASE_ORDERS} element={<PurchaseOrders />} />
            <Route path={PathConstants.ADD_PURCHASE_ORDER} element={<AddPurchaseOrder />} />
            <Route path={PathConstants.EDIT_PURCHASE_ORDER} element={<EditPurchaseOrder />} />
            {/* Stores */}
            <Route path={PathConstants.ADD_BRANCH} element={<AddBranch />} />
            <Route path={PathConstants.STORES} element={<BranchList />} />
            <Route path={PathConstants.EDIT_BRANCH + "/:id"} element={<EditBranch />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
