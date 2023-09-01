import { useState } from "react";
import SideBar from "../components/SideBar";

export default function Dashboard() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <SideBar isSideBarOpen={isSideBarOpen} toggleSideBar={toggleSideBar} />
        <div className="view-area" onClick={() => setIsSideBarOpen(false)}></div>
      </div>
    </div>
  );
}
