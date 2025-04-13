import React, { useState } from "react";
import "./index.css"; // Import the CSS file

export default function App() {
  const [workers, setWorkers] = useState([{ name: "", hours: "" }]);
  const [creditTips, setCreditTips] = useState(""); // Start with an empty string
  const [cashTips, setCashTips] = useState(""); // Start with an empty string
  const [results, setResults] = useState([]);

  const handleWorkerChange = (index, field, value) => {
    const updatedWorkers = [...workers];
    updatedWorkers[index][field] = value;
    setWorkers(updatedWorkers);
  };

  const addWorker = () => {
    setWorkers([...workers, { name: "", hours: "" }]);
  };

  const deleteWorker = (index) => {
    const updatedWorkers = workers.filter((_, i) => i !== index);
    setWorkers(updatedWorkers);
  };

  const calculateTips = () => {
    const parsedWorkers = workers.map(w => ({
      ...w,
      hours: parseFloat(w.hours)
    })).filter(w => w.name && !isNaN(w.hours));

    const totalHours = parsedWorkers.reduce((sum, w) => sum + w.hours, 0);

    // Split credit and cash tips proportionally
    const calculateSplit = (totalTips) => {
      return parsedWorkers.map(w => ({
        name: w.name,
        tip: ((w.hours / totalHours) * totalTips).toFixed(2)
      }));
    };

    const creditResults = calculateSplit(parseFloat(creditTips) || 0); // Ensure to parse as float
    const cashResults = calculateSplit(parseFloat(cashTips) || 0); // Ensure to parse as float

    // Combine results for credit, cash, and total tips for each worker
    const combinedResults = creditResults.map((creditWorker, index) => {
      const cashWorker = cashResults[index];
      const totalTip = (parseFloat(creditWorker.tip) + parseFloat(cashWorker.tip)).toFixed(2);
      return {
        name: creditWorker.name,
        creditTip: creditWorker.tip,
        cashTip: cashWorker.tip,
        totalTip
      };
    });

    setResults({ combinedResults });
  };

  return (
    <div className="app-container">
      <h1 className="header">Tip Distribution Calculator</h1>
      <p className="description">
      This tool allows you to enter cash and credit tips, along with the hours worked by each person, to calculate their fair share of the total tips.
      </p>
      {/* Input fields for credit and cash tips */}
      <label className="input-label">
        Credit Tips:
        <input
          type="number"
          value={creditTips}
          onChange={e => setCreditTips(e.target.value.replace(/^0+/, ""))} // Remove leading 0's
          className="input-field"
          placeholder="Enter credit tips"
        />
      </label>

      <label className="input-label">
        Cash Tips:
        <input
          type="number"
          value={cashTips}
          onChange={e => setCashTips(e.target.value.replace(/^0+/, ""))} // Remove leading 0's
          className="input-field"
          placeholder="Enter cash tips"
        />
      </label>

      <h2 className="sub-header">Workers</h2>
      {workers.map((worker, index) => (
        <div key={index} className="worker-input">
          <input
            type="text"
            placeholder="Name"
            value={worker.name}
            onChange={e => handleWorkerChange(index, "name", e.target.value)}
            className="worker-input-field"
          />
          <input
            type="number"
            placeholder="Hours"
            value={worker.hours}
            onChange={e => handleWorkerChange(index, "hours", e.target.value)}
            className="worker-hours-field"
          />
          <button
            onClick={() => deleteWorker(index)}
            className="delete-worker-btn"
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={addWorker} className="add-worker-btn">+ Add Worker</button>

      <button onClick={calculateTips} className="calculate-btn">
        Calculate
      </button>

      {results.combinedResults && (
        <div className="results-container">
          <h2 className="sub-header">Tip Results for Each Worker</h2>
          <h3 className="sub-sub-header">**Rounding errors may offset true values**</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Credit Tips</th>
                <th>Cash Tips</th>
                <th>Total Tips</th>
              </tr>
            </thead>
            <tbody>
              {results.combinedResults.map((r, i) => (
                <tr key={i}>
                  <td>{r.name}</td>
                  <td>${r.creditTip}</td>
                  <td>${r.cashTip}</td>
                  <td>${r.totalTip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
