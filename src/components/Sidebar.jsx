/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/SideBar.css";
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
import PropTypes from "prop-types";

export default function SideBar({ isSideBarOpen, toggleSideBar }) {
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
    if (!isSideBarOpen) {
      toggleSideBar();
    }
  };

  const SideBarTab = ({ name, iconName, nestedTabs }) => {
    return (
      <>
        <div className={`sidebar-tab ${isTabActive(name) ? "active" : ""} row`} onClick={() => handleTabClick(name)}>
          <div className={(isSideBarOpen ? "col-3" : "col-12") + " text-center sidebar-icon"}>
            <FontAwesomeIcon className="" icon={iconName} />
          </div>

          {isSideBarOpen && (
            <>
              <div className="col-7">{name}</div>
              {nestedTabs.length > 0 && (
                <div className="col-2">{isTabActive(name) ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}</div>
              )}
            </>
          )}
        </div>

        {isTabActive(name) &&
          isSideBarOpen &&
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

  return (
    <>
      {/* top fixed bar */}
      <div className="top-bar">
        <div className={`toggle-btn ${isSideBarOpen ? "active" : ""}`} onClick={toggleSideBar}>
          <FontAwesomeIcon className="text-center" icon={faBars} />
        </div>
        <div className="heading">{activeTab}</div>
      </div>

      {/* sidebar tabs */}
      <div className={`sidebar ${isSideBarOpen ? "" : "closed"}`}>
        <div className="row p-0 m-0">
          <SideBarTab name="Profile" iconName={faUser} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab name="Reports" iconName={faChartColumn} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab name="Customers" iconName={faUsers} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Employees" iconName={faAddressCard} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Inventory Management" iconName={faWarehouse} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Items" iconName={faCartArrowDown} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Online Orders" iconName={faStore} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Settings" iconName={faGear} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  isSideBarOpen: PropTypes.bool.isRequired, // isSideBarOpen should be a boolean and is required
  toggleSideBar: PropTypes.func.isRequired, // toggleSideBar should be a function and is required
};
