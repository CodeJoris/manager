import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "../components/EmployeeForm";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/employees");
    setEmployees(res.data);
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
        onClick = {async () => {
          try {
            await axios.delete("http://127.0.0.1:5000/api/employees");
            fetchEmployees();
          } catch (error) {
            console.error("Error deleting employees:", error);
          }
        }}
      >
        Clear All Employees
      </button>
    </div>
  );
}