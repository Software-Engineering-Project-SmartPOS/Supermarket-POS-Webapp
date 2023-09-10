import { SiShopify } from "react-icons/si";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import {
  FaAddressCard,
  FaAngleRight,
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
import { useSelector, useDispatch } from "react-redux";
import { toggleSideBar, setSelectedTab, setActiveTab } from "../state/reducers/sideBar";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router";
import PathConstants from "../constants/pathConstants";

export default function SideBar() {
  const dispatch = useDispatch();
  const isSideBarOpen = useSelector((state) => state.sideBar.isSideBarOpen);
  const activeTab = useSelector((state) => state.sideBar.activeTab);
  const selectedMainTab = useSelector((state) => state.sideBar.selectedTab.mainTab);
  const selectedNestedTab = useSelector((state) => state.sideBar.selectedTab.nestedTab);
  const handleToggleSideBar = () => dispatch(toggleSideBar());
  const navigate = useNavigate();

  const isMainTab = (tabName) => {
    return selectedMainTab === tabName;
  };

  const isTabActive = (tabName) => {
    return activeTab === tabName;
  };

  const handleTabClick = (tabName) => {
    if (!isSideBarOpen) {
      dispatch(toggleSideBar());
      dispatch(setActiveTab(tabName));
    } else if (activeTab === tabName) {
      dispatch(setActiveTab(null));
    } else {
      dispatch(setActiveTab(tabName));
    }
  };

  const handleNestedTabClick = (mainTab, nestedTab) => {
    dispatch(setSelectedTab({ mainTab, nestedTab }));
    dispatch(toggleSideBar());
    const url = PathConstants[nestedTab.toUpperCase().replace(" ", "_")];
    navigate(url);
  };

  const SideBarTab = ({ mainTab, reactIcon, nestedTabs }) => {
    return (
      <div className={isTabActive(mainTab) ? "view-tab" : "p-0"}>
        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="right"
          overlay={!isSideBarOpen ? <Tooltip id="tooltip-id">{mainTab}</Tooltip> : <></>}
        >
          <div className={`sidebar-tab ${isMainTab(mainTab) ? "active" : ""} row`} onClick={() => handleTabClick(mainTab)}>
            <div className={(isSideBarOpen ? "col-3" : "col-12") + " text-center sidebar-icon"}>{reactIcon}</div>

            {isSideBarOpen && (
              <>
                <div className="col-7">{mainTab}</div>
                {nestedTabs.length > 0 && <div className="col-2">{isTabActive(mainTab) && activeTab ? <FaChevronUp /> : <FaChevronDown />}</div>}
              </>
            )}
          </div>
        </OverlayTrigger>

        {isTabActive(mainTab) &&
          activeTab &&
          isSideBarOpen &&
          nestedTabs.map((nestedTab) => {
            return (
              <div key={nestedTab} className="row py-2 mx-0 nested-tab" onClick={() => handleNestedTabClick(mainTab, nestedTab)}>
                <div className="col-3 "></div>
                <div className="col-9 ">{nestedTab}</div>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <>
      {/* top fixed bar */}
      <div className="top-bar justify-content-between">
        <div className="d-flex align-items-center">
          <div className={`toggle-btn ${isSideBarOpen ? "active" : ""}`} onClick={handleToggleSideBar}>
            <FaBars />
          </div>
          <div className="d-flex align-items-center">
            {selectedMainTab} <FaAngleRight />
            {selectedNestedTab}
          </div>
        </div>

        <div className="lock-btn">
          <div className="d-flex justify-content-around">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-id">Lock</Tooltip>}>
              <span className="my-2" onClick={() => navigate("/lock")}>
                <FaLock />
              </span>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-id">Logout</Tooltip>}>
              <span className="my-2" onClick={() => navigate("/signin")}>
                <FaSignOutAlt />
              </span>
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {/* sidebar tabs */}
      <div className={`sidebar ${isSideBarOpen ? "" : "closed"}`}>
        <div className="row p-0 m-0">
          <SideBarTab mainTab="Sales" reactIcon={<MdOutlineShoppingCartCheckout />} nestedTabs={["Checkout", "Receipts"]} />
          <SideBarTab mainTab="Customers" reactIcon={<FaUsers />} nestedTabs={["Customer List", "Loyalty Programs"]} />
          <SideBarTab mainTab="Employees" reactIcon={<FaAddressCard />} nestedTabs={["Employee List", "Timecards"]} />
          <SideBarTab mainTab="Account" reactIcon={<FaUser />} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab mainTab="Reports" reactIcon={<FaChartBar />} nestedTabs={["Sales by item 1", "Sales by item 2", "Sales by item 3"]} />
          <SideBarTab mainTab="Inventory Management" reactIcon={<FaWarehouse />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab mainTab="Items" reactIcon={<FaShoppingBasket />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab mainTab="Online Orders" reactIcon={<SiShopify />} nestedTabs={["Sales by item 1", "Sales by item 2"]} />
          <SideBarTab mainTab="Settings" reactIcon={<AiFillSetting />} iconType="react" nestedTabs={["Sales by item 1", "Sales by item 2"]} />
        </div>
      </div>
    </>
  );
}

SideBar.propTypes = {
  mainTab: PropTypes.string,
  reactIcon: PropTypes.element,
  nestedTabs: PropTypes.array,
};
