import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/employees').then(res => setEmployees(res.data));
  }, []);

  const addEmployee = () => {
    axios.post('http://localhost:5000/employees', { name, max_hours: 40 }).then(res => {
      setEmployees([...employees, res.data]);
      setName('');
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Employee Scheduler</h1>
      <input className="border p-2 m-2" value={name} onChange={e => setName(e.target.value)} placeholder="Employee Name" />
      <button className="bg-blue-500 text-white p-2" onClick={addEmployee}>Add</button>
      <ul>
        {employees.map(e => <li key={e.id}>{e.name} (Max: {e.max_hours}h)</li>)}
      </ul>
    </div>
  );
}

export default App;
