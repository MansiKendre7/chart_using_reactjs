import React, { useState, useEffect } from 'react';
import './App.css';
import { PieChart } from 'react-minimal-pie-chart';

const App = () => {
  const [box1Value, setBox1Value] = useState('50');
  const [box2Value, setBox2Value] = useState(String(100 - parseInt(box1Value)));
  const [validationMessage, setValidationMessage] = useState('');
  const [showChart, setShowChart] = useState(false); // State to control the chart visibility

  useEffect(() => {
    if (parseInt(box1Value) + parseInt(box2Value) > 100) {
      setValidationMessage('Incorrect Value');
    } else {
      setValidationMessage('');
    }
  }, [box1Value, box2Value]);

  const handleChangeBox1 = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 100) {
      setBox1Value(value.toString());
      setBox2Value((100 - value).toString());
    }
  };

  const handleChangeBox2 = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 100) {
      setBox2Value(value.toString());
      setBox1Value((100 - value).toString());
    }
  };

  const handleCreateChart = () => {
    setShowChart(true);
  };

  return (
    <div className="App">
      <div className="box-container">
        <div className="box">
          <label>Box 1</label>
          <input
            type="number"
            value={box1Value}
            onChange={handleChangeBox1}
            onBlur={() => {
              if (box1Value === '') {
                setBox2Value('');
              }
            }}
          />
        </div>
        <div className="box">
          <label>Box 2</label>
          <input
            type="number"
            value={box2Value}
            onChange={handleChangeBox2}
            onBlur={() => {
              if (box2Value === '') {
                setBox1Value('');
              }
            }}
          />
        </div>
      </div>
      <div className="chart-container">
        {showChart && ( // Only show the chart when showChart is true
          <PieChart
            data={[
              { title: `Box 1: ${box1Value}`, value: parseInt(box1Value), color: '#36A2EB' },
              { title: `Box 2: ${box2Value}`, value: parseInt(box2Value), color: '#FF6384' },
            ]}
            style={{ height: '200px' }}
            animate={true}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={{
              fontSize: '12px',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            }}
          />
        )}
      </div>
      <div className="validation-message">
        {validationMessage && <p>{validationMessage}</p>}
      </div>
      <button onClick={handleCreateChart}>Create Chart</button>
    </div>
  );
};

export default App;
