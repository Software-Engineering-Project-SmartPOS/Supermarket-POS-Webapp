/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faChevronUp,
  faChartColumn,
  faUsers,
  faAddressCard,
  faWarehouse,
  faCartArrowDown,
  faStore,
  faGear,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [activeTab, setActiveTab] = useState(null);

  const isTabActive = (tabName) => {
    return activeTab === tabName;
  };

  const handleTabClick = (tabName) => {
    if (activeTab === tabName) {
      setActiveTab(null);
    } else {
      setActiveTab(tabName);
    }
    if (!isSidebarOpen) {
      toggleSidebar();
    }
  };

  const SidebarTab = ({ name, iconName, nestedTabs }) => {
    return (
      <>
        <div className={`sidebar-tab ${isTabActive(name) ? "active" : ""} row`} onClick={() => handleTabClick(name)}>
          <div className={(isSidebarOpen ? "col-3" : "col-12") + " text-center sidebar-icon"}>
            <FontAwesomeIcon className="" icon={iconName} />
          </div>

          {isSidebarOpen && (
            <>
              <div className="col-7">{name}</div>
              <div className="col-2">{isTabActive(name) ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</div>
            </>
          )}
        </div>

        {isTabActive(name) &&
          isSidebarOpen &&
          nestedTabs.map((tabName) => {
            return (
              <div key={tabName} className="row py-2 mx-0 nested-tab">
                <div className="col-3 "></div>
                <div className="col-9 ">{tabName}</div>
              </div>
            );
          })}
      </>
    );
  };
  /* sidebar is closed when user clicks outside of sidebar */

  return (
    <>
      {/* top fixed bar */}
      <div className="top-bar">
        <div className={`toggle-btn ${isSidebarOpen ? "active" : ""}`} onClick={toggleSidebar}>
          <FontAwesomeIcon className="text-center" icon={faBars} />
        </div>

        <div className="heading">{activeTab}</div>
      </div>
      <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
        <div className="row p-0 m-0">
          <SidebarTab name="Profile" iconName={faUser} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SidebarTab name="Reports" iconName={faChartColumn} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SidebarTab name="Customers" iconName={faUsers} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SidebarTab name="Employees" iconName={faAddressCard} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SidebarTab name="Inventory Management" iconName={faWarehouse} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SidebarTab name="Items" iconName={faCartArrowDown} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SidebarTab name="Online Orders" iconName={faStore} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SidebarTab name="Settings" iconName={faGear} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
        </div>
      </div>
    </>
  );
}
