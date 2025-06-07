import React, { useState } from "react";
import axios from "axios";

export default function EmployeeForm({ onAdded }) {
  const [name, setName] = useState("");
  const [maxHours, setMaxHours] = useState(40);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/employees", {
        name,
        max_hours: maxHours,
      });
      onAdded();
      setName("");
      setMaxHours(40);
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="text"
        placeholder="Employee Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Max Hours / Week"
        value={maxHours}
        onChange={(e) => setMaxHours(Number(e.target.value))}
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Employee
      </button>
    </form>
  );
}