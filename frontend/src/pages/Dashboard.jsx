import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";
import ShiftCalendar from "../components/ShiftCalendar";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]); // placeholder for future shift backend

  const fetchEmployees = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/employees");
    setEmployees(res.data);
  };

  const handleAddShift = (newShift) => {
    setShifts([...shifts, newShift]);
    console.log("New shift added:", newShift);
    // TODO: POST shift to backend
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Employee Manager</h1>
      <EmployeeForm onAdded={fetchEmployees} />
      <ul className="mt-4">
        {employees.map((emp) => (
          <li key={emp.id}>{emp.name} – Max {emp.max_hours} hrs/week</li>
        ))}
      </ul>
      <button
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete all employees?")) {
            try {
              await axios.delete("http://127.0.0.1:5000/api/employees");
              fetchEmployees();
            } catch (error) {
              console.error("Error deleting employees:", error);
            }
          }
        }}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear All Employees
      </button>

      <h2 className="text-lg font-semibold mt-8 mb-2">Shift Calendar</h2>
      <ShiftCalendar
        shifts={shifts}
        onAddShift={handleAddShift}
        employees={employees} // ✅ pass the list of valid employees
      />
    </div>
  );
}
