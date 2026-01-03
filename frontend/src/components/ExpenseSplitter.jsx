// components/ExpenseSplitter.jsx
import React, { useState } from 'react';

const ExpenseSplitter = () => {
  const [people, setPeople] = useState([
    { id: 1, name: 'You', share: 0 },
    { id: 2, name: 'Friend 1', share: 0 },
  ]);
  const [totalAmount, setTotalAmount] = useState(1000);
  const [splitType, setSplitType] = useState('equal'); // 'equal', 'percentage', 'custom'

  const addPerson = () => {
    setPeople([...people, { 
      id: Date.now(), 
      name: `Friend ${people.length}`, 
      share: 0 
    }]);
  };

  const removePerson = (id) => {
    if (people.length > 1) {
      setPeople(people.filter(person => person.id !== id));
    }
  };

  const updateShare = (id, value) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, share: Number(value) } : person
    ));
  };

  const calculateEqualSplit = () => {
    const equalShare = totalAmount / people.length;
    setPeople(people.map(person => ({ ...person, share: equalShare })));
  };

  const calculateShares = () => {
    if (splitType === 'equal') {
      calculateEqualSplit();
    }
    // Add other split type calculations
  };

  return (
    <div className="expense-splitter">
      <h4>Split Expenses</h4>
      
      <div className="split-controls">
        <div className="total-input">
          <label>Total Amount ($):</label>
          <input
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            min="0"
          />
        </div>
        
        <div className="split-type">
          <label>Split Type:</label>
          <select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
            <option value="equal">Equal Split</option>
            <option value="percentage">Percentage</option>
            <option value="custom">Custom Amounts</option>
          </select>
          <button onClick={calculateShares} className="btn-small">
            Calculate
          </button>
        </div>
        
        <button onClick={addPerson} className="btn-small">
          Add Person
        </button>
      </div>

      <div className="people-list">
        {people.map((person) => (
          <div key={person.id} className="person-item">
            <input
              type="text"
              value={person.name}
              onChange={(e) => 
                setPeople(people.map(p => 
                  p.id === person.id ? { ...p, name: e.target.value } : p
                ))
              }
              className="person-name"
            />
            
            <div className="share-input">
              <span>$</span>
              <input
                type="number"
                value={person.share.toFixed(2)}
                onChange={(e) => updateShare(person.id, e.target.value)}
                min="0"
                step="0.01"
              />
              <span className="percentage">
                ({(totalAmount > 0 ? (person.share / totalAmount * 100).toFixed(1) : 0)}%)
              </span>
            </div>
            
            <button 
              onClick={() => removePerson(person.id)} 
              className="remove-btn"
              disabled={people.length <= 1}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="split-summary">
        <div className="summary-item">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Split Total:</span>
          <span>${people.reduce((sum, person) => sum + person.share, 0).toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Remaining:</span>
          <span className={
            Math.abs(totalAmount - people.reduce((sum, person) => sum + person.share, 0)) < 0.01 
              ? 'balanced' 
              : 'unbalanced'
          }>
            ${(totalAmount - people.reduce((sum, person) => sum + person.share, 0)).toFixed(2)}
          </span>
        </div>
      </div>

      <style jsx>{`
        .expense-splitter {
          margin-top: 20px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 10px;
        }
        
        .expense-splitter h4 {
          margin-bottom: 15px;
          color: #333;
        }
        
        .split-controls {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .total-input, .split-type {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .total-input input, .split-type select {
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 5px;
          font-size: 1rem;
        }
        
        .btn-small {
          padding: 8px 15px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .btn-small:hover {
          background: #5a67d8;
        }
        
        .people-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .person-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: white;
          border-radius: 5px;
        }
        
        .person-name {
          flex: 1;
          padding: 8px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
        }
        
        .share-input {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .share-input input {
          width: 80px;
          padding: 8px;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          text-align: right;
        }
        
        .percentage {
          color: #666;
          font-size: 0.9rem;
          min-width: 60px;
        }
        
        .remove-btn {
          background: #ff6b6b;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .remove-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .split-summary {
          padding: 15px;
          background: white;
          border-radius: 5px;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
        }
        
        .summary-item span:first-child {
          color: #666;
        }
        
        .summary-item span:last-child {
          font-weight: bold;
        }
        
        .balanced {
          color: #4CAF50;
        }
        
        .unbalanced {
          color: #ff6b6b;
        }
      `}</style>
    </div>
  );
};

export default ExpenseSplitter;