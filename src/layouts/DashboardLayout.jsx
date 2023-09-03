import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar, setActiveTab } from "../state/reducers/sideBar";
import { Outlet } from "react-router";

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
        <div className="view-area" onClick={handleToggleSideBar}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
