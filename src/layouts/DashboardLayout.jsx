import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar, setActiveTab } from "../state/reducers/sideBar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

export default function DashboardLayout() {
  const isSideBarOpen = useSelector((state) => state.sideBar.isSideBarOpen);
  const dispatch = useDispatch();
  const handleToggleSideBar = () => {
    isSideBarOpen && dispatch(toggleSideBar());
    dispatch(setActiveTab(null));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="view-area" onClick={handleToggleSideBar}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
