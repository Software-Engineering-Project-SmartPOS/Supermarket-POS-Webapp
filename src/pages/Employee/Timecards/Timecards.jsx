import { useState } from "react";
import TimecardsTable from "../../../components/Timecards/TimecardsTable";
import Filters from "../../../components/Timecards/Filter";
function Timecards() {
  const [filteredTimecards, setFilteredTimecards] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      clockIn: "2023-09-10T09:00:00Z",
      clockOut: "2023-09-10T17:00:00Z",
      store: "Store A",
      totalHoursWorked: 8,
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      clockIn: "2023-09-10T08:30:00Z",
      clockOut: "2023-09-10T16:30:00Z",
      store: "Store B",
      totalHoursWorked: 8,
    },
    {
      id: 3,
      employeeName: "Bob Johnson",
      clockIn: "2023-09-10T10:00:00Z",
      clockOut: "2023-09-10T18:30:00Z",
      store: "Store A",
      totalHoursWorked: 8.5,
    },
    {
      id: 4,
      employeeName: "Alice Brown",
      clockIn: "2023-09-10T08:00:00Z",
      clockOut: "2023-09-10T16:00:00Z",
      store: "Store C",
      totalHoursWorked: 8,
    },
  ]);

  const handleFilter = (filters) => {
    // Implement filtering logic based on employee name and dates
    // Update filteredTimecards state with filtered data
    // For this example, let's assume you have some sample data
    const sampleData = [
      [
        {
          id: 1,
          employeeName: "John Doe",
          clockIn: "2023-09-10T09:00:00Z",
          clockOut: "2023-09-10T17:00:00Z",
          store: "Store A",
          totalHoursWorked: 8,
        },
        {
          id: 2,
          employeeName: "Jane Smith",
          clockIn: "2023-09-10T08:30:00Z",
          clockOut: "2023-09-10T16:30:00Z",
          store: "Store B",
          totalHoursWorked: 8,
        },
        {
          id: 3,
          employeeName: "Bob Johnson",
          clockIn: "2023-09-10T10:00:00Z",
          clockOut: "2023-09-10T18:30:00Z",
          store: "Store A",
          totalHoursWorked: 8.5,
        },
        {
          id: 4,
          employeeName: "Alice Brown",
          clockIn: "2023-09-10T08:00:00Z",
          clockOut: "2023-09-10T16:00:00Z",
          store: "Store C",
          totalHoursWorked: 8,
        },
      ],
    ];

    // Apply filters (simplified)
    // const filteredData = sampleData.filter((timecard) => {
    //   const matchesName = !filters.employeeName || timecard.employeeName.includes(filters.employeeName);

    //   const isWithinDateRange =
    //     (!filters.startDate || new Date(timecard.timeIn) >= new Date(filters.startDate)) &&
    //     (!filters.endDate || new Date(timecard.timeOut) <= new Date(filters.endDate));

    //   return matchesName && isWithinDateRange;
    // });

    setFilteredTimecards(sampleData);
  };

  return (
    <div className="App">
      <div className="title">
        <h3>Timecards</h3>
      </div>
      <Filters onFilter={handleFilter} />
      <TimecardsTable timecards={filteredTimecards} />
    </div>
  );
}

export default Timecards;
