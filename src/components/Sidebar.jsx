/* eslint-disable react/prop-types */
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SiShopify } from "react-icons/si";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
  FaAddressCard,
  FaBars,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaLock,
  FaShoppingBasket,
  FaSignOutAlt,
  FaUser,
  FaUsers,
  FaWarehouse,
} from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import "../styles/SideBar.css";

import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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

  const SideBarTab = ({ name, reactIcon, nestedTabs }) => {
    return (
      <>
        <OverlayTrigger trigger={"hover"} placement="right" overlay={!isSideBarOpen ? <Tooltip id="tooltip-id">{name}</Tooltip> : <></>}>
          <div className={`sidebar-tab ${isTabActive(name) ? "active" : ""} row`} onClick={() => handleTabClick(name)}>
            <div className={(isSideBarOpen ? "col-3" : "col-12") + " text-center sidebar-icon"}>{reactIcon}</div>

            {isSideBarOpen && (
              <>
                <div className="col-7">{name}</div>
                {nestedTabs.length > 0 && <div className="col-2">{isTabActive(name) ? <FaChevronUp /> : <FaChevronDown />}</div>}
              </>
            )}
          </div>
        </OverlayTrigger>
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
      <div className="top-bar justify-content-between">
        <div className="d-flex">
          <div className={`toggle-btn ${isSideBarOpen ? "active" : ""}`} onClick={toggleSideBar}>
            <FaBars />
          </div>
          <div>{activeTab}</div>
        </div>

        <div className="lock-btn">
          <div className="d-flex justify-content-around">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-id">Lock</Tooltip>}>
              <span className="my-2">
                <FaLock />
              </span>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-id">Logout</Tooltip>}>
              <span className="my-2">
                <FaSignOutAlt />
              </span>
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {/* sidebar tabs */}
      <div className={`sidebar ${isSideBarOpen ? "" : "closed"}`}>
        <div className="row p-0 m-0">
          <SideBarTab name="Profile" reactIcon={<FaUser />} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab
            name="Sales"
            reactIcon={<MdOutlineShoppingCartCheckout />}
            nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]}
          />
          <SideBarTab name="Reports" reactIcon={<FaChartBar />} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab name="Customers" reactIcon={<FaUsers />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Employees" reactIcon={<FaAddressCard />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Inventory Management" reactIcon={<FaWarehouse />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Items" reactIcon={<FaShoppingBasket />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Online Orders" reactIcon={<SiShopify />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab name="Settings" reactIcon={<AiFillSetting />} iconType="react" nestedTabs={["Sales by item 1", "Sales by item 2"]} />
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  isSideBarOpen: PropTypes.bool.isRequired, // isSideBarOpen should be a boolean and is required
  toggleSideBar: PropTypes.func.isRequired, // toggleSideBar should be a function and is required
};
