import { useState } from "react";
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { MultiSelect } from "react-multi-select-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const Filters = ({ onFilter }) => {
  const [employeeName, setEmployeeName] = useState([
    // Include all employee options by default
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "Bob Johnson", value: "Bob Johnson" },
    { label: "Alice Brown", value: "Alice Brown" },
    // Add more employee options as needed
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarSelection, setCalendarSelection] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleFilter = () => {
    // Call the parent component's filter function with filter criteria
    onFilter({ employeeName, startDate, endDate });
  };

  const toggleCalendar = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleCalendarChange = (item) => {
    setCalendarSelection([item.selection]);
  };

  const handleCalendarDone = () => {
    // Update the state with the selected date range
    setStartDate(calendarSelection[0].startDate.toISOString().split("T")[0]);
    setEndDate(calendarSelection[0].endDate.toISOString().split("T")[0]);

    // Close the calendar overlay
    setCalendarOpen(false);
  };

  const employeeOptions = [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "Bob Johnson", value: "Bob Johnson" },
    { label: "Alice Brown", value: "Alice Brown" },
    // Add more employee options as needed
  ];

  return (
    <div className="container my-3">
      <div className="row">
        <div style={{ width: "fit-content" }}>
          <div className="form-control border border-black  " onClick={toggleCalendar}>
            <FontAwesomeIcon icon={faCalendar} className="mr-2" /> &nbsp;
            {calendarSelection[0].startDate.toLocaleDateString()} - {calendarSelection[0].endDate.toLocaleDateString()}
          </div>
        </div>

        {calendarOpen && (
          <div className="timecard-calender timecard-calender-overlay">
            <DateRangePicker
              onChange={handleCalendarChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              showMonthAndYearPickers={true}
              months={1}
              maxDate={new Date()}
              ranges={calendarSelection}
              direction="horizontal"
              editableDateInputs={true}
              rangeColors={["#002a54"]}
            />
            <hr className="m-0 mb-2" />
            <div className="d-flex justify-content-end mb-1">
              <button type="button" className="button btn btn-primary" onClick={handleCalendarDone}>
                Done
              </button>
            </div>
          </div>
        )}
        <div style={{ width: "fit-content", minWidth: "20%" }}>
          <MultiSelect
            options={employeeOptions}
            value={employeeName}
            onChange={setEmployeeName}
            id="employeeSelect" // Add an id for the MultiSelect
            overrideStrings={{ selectAll: "All Employees" }}
            hasSelectAll={true}
            disableSearch={true}
            className="border rounded border-black"
          />
        </div>

        <div className="col gap-2">
          <button className="btn btn-primary" onClick={handleFilter}>
            Apply Filters
          </button>
          &nbsp;
          <button className="btn btn-success" onClick={handleFilter}>
            Add Timecard
          </button>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Filters;
