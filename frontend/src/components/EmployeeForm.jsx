import React, { useState } from "react";

export default function EmployeeForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [maxHours, setMaxHours] = useState(40);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, max_hours: maxHours });
    setName("");
    setMaxHours(40);
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