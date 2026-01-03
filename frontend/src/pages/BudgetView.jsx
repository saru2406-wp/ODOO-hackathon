import React, { useState, useEffect } from "react";

const BudgetView = () => {
  const [budget, setBudget] = useState(5000);
  const [spent, setSpent] = useState(3250);
  const [categories, setCategories] = useState([
    { id: 1, name: "Flights", allocated: 1200, spent: 1200, color: "#3B82F6", icon: "✈️" },
    { id: 2, name: "Accommodation", allocated: 1500, spent: 1200, color: "#10B981", icon: "🏨" },
    { id: 3, name: "Food & Dining", allocated: 800, spent: 650, color: "#EF4444", icon: "🍽️" },
    { id: 4, name: "Activities", allocated: 600, spent: 450, color: "#F59E0B", icon: "🎯" },
    { id: 5, name: "Transportation", allocated: 400, spent: 350, color: "#8B5CF6", icon: "🚗" },
    { id: 6, name: "Shopping", allocated: 300, spent: 200, color: "#EC4899", icon: "🛍️" },
    { id: 7, name: "Miscellaneous", allocated: 200, spent: 100, color: "#6366F1", icon: "📦" },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Tokyo Flight", amount: 850, category: "Flights", date: "Nov 25", type: "expense" },
    { id: 2, description: "Hotel Deposit", amount: 800, category: "Accommodation", date: "Nov 25", type: "expense" },
    { id: 3, description: "Sushi Dinner", amount: 120, category: "Food & Dining", date: "Nov 25", type: "expense" },
    { id: 4, description: "Shibuya Tickets", amount: 45, category: "Activities", date: "Nov 26", type: "expense" },
    { id: 5, description: "Train Pass", amount: 150, category: "Transportation", date: "Nov 26", type: "expense" },
  ]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Flights",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Calculate total spent
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    setSpent(totalSpent);
  }, [categories]);

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;

    const amount = parseFloat(newExpense.amount);
    const newTransaction = {
      id: Date.now(),
      description: newExpense.description,
      amount: amount,
      category: newExpense.category,
      date: newExpense.date,
      type: "expense"
    };

    // Update category spent amount
    const updatedCategories = categories.map(cat => {
      if (cat.name === newExpense.category) {
        return { ...cat, spent: cat.spent + amount };
      }
      return cat;
    });

    setTransactions([newTransaction, ...transactions]);
    setCategories(updatedCategories);
    setNewExpense({ description: "", amount: "", category: "Flights", date: new Date().toISOString().split('T')[0] });
    setShowAddExpense(false);
  };

  const getProgressPercentage = () => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getRemaining = () => {
    return budget - spent;
  };

  const getStatusColor = () => {
    const percentage = getProgressPercentage();
    if (percentage > 90) return "#EF4444";
    if (percentage > 75) return "#F59E0B";
    return "#10B981";
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
      width: '100vw',
      margin: 0,
      boxSizing: 'border-box',
      paddingLeft: '5vw',
      paddingRight: '5vw',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
      animation: 'slideDown 0.6s ease',
      width: '100%',
      maxWidth: '1200px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    title: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: '700',
      background: 'linear-gradient(90deg, #FFF, #FFD166)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      textShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    subtitle: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
      maxWidth: '600px',
      margin: '0 auto',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: 'minmax(500px, 2fr) minmax(350px, 1fr)',
      gap: '30px',
      maxWidth: '1400px',
      width: '100%',
      margin: '0 auto',
      animation: 'fadeIn 0.8s ease',
    },
    budgetOverview: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      width: '100%',
      boxSizing: 'border-box',
    },
    budgetHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      width: '100%',
      flexWrap: 'wrap',
      gap: '15px',
    },
    budgetAmounts: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px',
      width: '100%',
    },
    amountCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '25px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
    },
    amountLabel: {
      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
      color: '#666',
      marginBottom: '10px',
    },
    amountValue: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
      fontWeight: '700',
      color: '#333',
    },
    progressContainer: {
      margin: '40px 0',
      width: '100%',
    },
    progressBar: {
      height: 'clamp(15px, 2vw, 20px)',
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    progressFill: {
      height: '100%',
      borderRadius: '10px',
      transition: 'width 1s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    progressText: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '10px',
      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
      color: '#666',
      width: '100%',
    },
    categoriesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '20px',
      marginTop: '30px',
      width: '100%',
    },
    categoryCard: {
      background: 'white',
      borderRadius: '20px',
      padding: '20px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      boxSizing: 'border-box',
    },
    categoryHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      width: '100%',
    },
    categoryIcon: {
      width: 'clamp(45px, 4vw, 50px)',
      height: 'clamp(45px, 4vw, 50px)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(20px, 2vw, 24px)',
      marginRight: '15px',
      flexShrink: 0,
    },
    categoryProgress: {
      height: '8px',
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '4px',
      margin: '15px 0',
      overflow: 'hidden',
      width: '100%',
    },
    categoryProgressFill: {
      height: '100%',
      borderRadius: '4px',
      transition: 'width 0.6s ease',
    },
    categoryAmounts: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
      color: '#666',
      width: '100%',
    },
    transactionsCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '30px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      width: '100%',
      boxSizing: 'border-box',
    },
    transactionsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '25px',
      width: '100%',
      flexWrap: 'wrap',
      gap: '15px',
    },
    addButton: {
      padding: 'clamp(10px, 1.5vw, 12px) clamp(20px, 2.5vw, 25px)',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: 'clamp(12px, 1vw, 14px)',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    },
    transactionsList: {
      maxHeight: '500px',
      overflowY: 'auto',
      width: '100%',
    },
    transactionItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px',
      background: 'white',
      borderRadius: '15px',
      marginBottom: '10px',
      transition: 'all 0.3s ease',
      width: '100%',
      boxSizing: 'border-box',
    },
    transactionIcon: {
      width: 'clamp(35px, 3vw, 40px)',
      height: 'clamp(35px, 3vw, 40px)',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'clamp(16px, 1.5vw, 18px)',
      marginRight: '15px',
      flexShrink: 0,
    },
    transactionDetails: {
      flex: 1,
      minWidth: 0,
    },
    transactionDescription: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '5px',
      fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    transactionMeta: {
      display: 'flex',
      gap: '10px',
      fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
      color: '#666',
      flexWrap: 'wrap',
    },
    transactionAmount: {
      fontWeight: '700',
      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
      flexShrink: 0,
    },
    expenseForm: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '25px',
      padding: '25px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'scaleIn 0.3s ease',
      maxWidth: '500px',
      width: '90%',
      boxSizing: 'border-box',
    },
    formGroup: {
      marginBottom: '20px',
      width: '100%',
    },
    formLabel: {
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#333',
      fontSize: 'clamp(13px, 1vw, 14px)',
    },
    formInput: {
      width: '100%',
      padding: '12px 15px',
      fontSize: 'clamp(13px, 1vw, 14px)',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    },
    formSelect: {
      width: '100%',
      padding: '12px 15px',
      fontSize: 'clamp(13px, 1vw, 14px)',
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      background: 'white',
      cursor: 'pointer',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    },
    formButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      marginTop: '25px',
      width: '100%',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
      padding: '20px',
      width: '100vw',
      height: '100vh',
      boxSizing: 'border-box',
    },
    animationElements: {
      position: 'absolute',
      top: '10%',
      left: '5%',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
    },
    sectionTitle: {
      margin: '40px 0 20px',
      color: 'white',
      fontSize: 'clamp(1.3rem, 2vw, 1.5rem)',
    },
    monthlySummary: {
      marginTop: '30px',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '20px',
      color: 'white',
      width: '100%',
      boxSizing: 'border-box',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '15px',
      marginBottom: '20px',
      width: '100%',
    },
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.animationElements} />

      <div style={styles.header}>
        <h1 style={styles.title}>Budget Tracker 💰</h1>
        <p style={styles.subtitle}>Track your expenses and stay on budget</p>
      </div>

      <div style={styles.mainContent}>
        {/* Left Column - Budget Overview */}
        <div style={{width: '100%'}}>
          <div style={styles.budgetOverview}>
            <div style={styles.budgetHeader}>
              <h2 style={{
                margin: 0, 
                fontSize: 'clamp(1.5rem, 2vw, 1.8rem)', 
                color: '#333',
                flex: 1,
                minWidth: '200px'
              }}>
                Trip Budget
              </h2>
              <div style={{
                padding: '8px 20px',
                background: getStatusColor(),
                color: 'white',
                borderRadius: '20px',
                fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                fontWeight: '600',
                flexShrink: 0,
              }}>
                {getProgressPercentage().toFixed(1)}% Spent
              </div>
            </div>

            <div style={styles.budgetAmounts}>
              <div 
                style={styles.amountCard}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.amountLabel}>Total Budget</div>
                <div style={{...styles.amountValue, color: '#667eea'}}>
                  ${budget.toLocaleString()}
                </div>
              </div>
              <div 
                style={styles.amountCard}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.amountLabel}>Spent</div>
                <div style={{...styles.amountValue, color: '#EF4444'}}>
                  ${spent.toLocaleString()}
                </div>
              </div>
              <div 
                style={styles.amountCard}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
              >
                <div style={styles.amountLabel}>Remaining</div>
                <div style={{...styles.amountValue, color: '#10B981'}}>
                  ${getRemaining().toLocaleString()}
                </div>
              </div>
            </div>

            <div style={styles.progressContainer}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${getProgressPercentage()}%`,
                    background: `linear-gradient(90deg, ${getStatusColor()}, ${getStatusColor()}80)`,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shimmer 2s infinite',
                  }} />
                </div>
              </div>
              <div style={styles.progressText}>
                <span>${spent.toLocaleString()} spent</span>
                <span>${getRemaining().toLocaleString()} left</span>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <h3 style={styles.sectionTitle}>Budget by Category</h3>
          <div style={styles.categoriesGrid}>
            {categories.map(category => {
              const percentage = (category.spent / category.allocated) * 100;
              const statusColor = percentage > 90 ? '#EF4444' : percentage > 75 ? '#F59E0B' : '#10B981';
              
              return (
                <div
                  key={category.id}
                  style={styles.categoryCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.categoryHeader}>
                    <div style={{
                      ...styles.categoryIcon,
                      background: `${category.color}20`,
                      color: category.color,
                    }}>
                      {category.icon}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <h4 style={{
                        margin: 0, 
                        color: '#333', 
                        fontSize: 'clamp(1rem, 1.2vw, 1.1rem)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {category.name}
                      </h4>
                      <div style={{
                        fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', 
                        color: '#666'
                      }}>
                        ${category.spent} of ${category.allocated}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
                      fontWeight: '600',
                      color: statusColor,
                      flexShrink: 0,
                    }}>
                      {percentage.toFixed(0)}%
                    </div>
                  </div>

                  <div style={styles.categoryProgress}>
                    <div 
                      style={{
                        ...styles.categoryProgressFill,
                        width: `${Math.min(percentage, 100)}%`,
                        background: `linear-gradient(90deg, ${statusColor}, ${statusColor}80)`,
                      }}
                    />
                  </div>

                  <div style={styles.categoryAmounts}>
                    <span>Spent: ${category.spent}</span>
                    <span>Left: ${Math.max(0, category.allocated - category.spent)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Transactions */}
        <div style={styles.transactionsCard}>
          <div style={styles.transactionsHeader}>
            <h2 style={{
              margin: 0, 
              fontSize: 'clamp(1.5rem, 2vw, 1.8rem)', 
              color: '#333',
              flex: 1,
              minWidth: '200px'
            }}>
              Recent Expenses
            </h2>
            <button
              onClick={() => setShowAddExpense(true)}
              style={styles.addButton}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              ➕ Add Expense
            </button>
          </div>

          <div style={styles.transactionsList}>
            {transactions.length === 0 ? (
              <div style={{
                textAlign: 'center', 
                padding: '40px 20px', 
                color: '#666',
                width: '100%'
              }}>
                <div style={{fontSize: '3rem', marginBottom: '15px'}}>💰</div>
                <p style={{fontSize: 'clamp(0.9rem, 1.2vw, 1rem)'}}>
                  No expenses recorded yet
                </p>
              </div>
            ) : (
              transactions.map(transaction => {
                const category = categories.find(cat => cat.name === transaction.category);
                
                return (
                  <div
                    key={transaction.id}
                    style={styles.transactionItem}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                  >
                    <div style={{
                      ...styles.transactionIcon,
                      background: category ? `${category.color}20` : '#f3f4f6',
                      color: category ? category.color : '#666',
                    }}>
                      {category ? category.icon : '💰'}
                    </div>
                    <div style={styles.transactionDetails}>
                      <div style={styles.transactionDescription}>
                        {transaction.description}
                      </div>
                      <div style={styles.transactionMeta}>
                        <span style={{
                          background: category ? `${category.color}20` : '#f3f4f6',
                          color: category ? category.color : '#666',
                          padding: '3px 10px',
                          borderRadius: '20px',
                          fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)',
                          fontWeight: '500',
                          whiteSpace: 'nowrap',
                        }}>
                          {transaction.category}
                        </span>
                        <span>📅 {transaction.date}</span>
                      </div>
                    </div>
                    <div style={{
                      ...styles.transactionAmount,
                      color: '#EF4444',
                    }}>
                      -${transaction.amount}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Monthly Summary */}
          <div style={styles.monthlySummary}>
            <h3 style={{
              margin: '0 0 15px', 
              fontSize: 'clamp(1.1rem, 1.5vw, 1.2rem)'
            }}>
              November Summary
            </h3>
            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
              <div>
                <div style={{fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', opacity: 0.9}}>Total Spent</div>
                <div style={{fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: '700'}}>
                  ${spent}
                </div>
              </div>
              <div>
                <div style={{fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', opacity: 0.9}}>Daily Average</div>
                <div style={{fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: '700'}}>
                  ${(spent / 30).toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div style={styles.modalOverlay} onClick={() => setShowAddExpense(false)}>
          <div style={styles.expenseForm} onClick={(e) => e.stopPropagation()}>
            <h3 style={{
              margin: '0 0 25px', 
              fontSize: 'clamp(1.3rem, 1.8vw, 1.5rem)', 
              color: '#333'
            }}>
              Add New Expense
            </h3>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="What did you spend on?"
                style={styles.formInput}
              />
            </div>

            <div style={styles.formGrid}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Amount ($)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  placeholder="0.00"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  style={styles.formInput}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Category</label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                style={styles.formSelect}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.formButtons}>
              <button
                onClick={() => setShowAddExpense(false)}
                style={{
                  padding: '15px',
                  background: 'rgba(0,0,0,0.05)',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  width: '100%',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                style={{
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: 'clamp(14px, 1.2vw, 16px)',
                  width: '100%',
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'none'}
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(180deg);
            }
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            overflow-x: hidden;
            width: 100vw;
          }
          
          button {
            font-family: 'Poppins', sans-serif;
            cursor: pointer;
          }
          
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #667eea;
            border-radius: 10px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #764ba2;
          }
          
          /* Responsive Styles */
          @media (max-width: 1200px) {
            .container {
              padding-left: 4vw;
              padding-right: 4vw;
            }
            
            .mainContent {
              gridTemplateColumns: minmax(400px, 1.5fr) minmax(300px, 1fr);
              gap: 25px;
            }
          }
          
          @media (max-width: 1024px) {
            .mainContent {
              gridTemplateColumns: 1fr;
              maxWidth: 800px;
            }
            
            .transactionsCard {
              order: 2;
            }
            
            .budgetOverview {
              order: 1;
            }
            
            .categoriesGrid {
              gridTemplateColumns: repeat(auto-fill, minmax(250px, 1fr));
            }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            .budgetAmounts {
              gridTemplateColumns: 1fr;
            }
            
            .categoriesGrid {
              gridTemplateColumns: 1fr;
            }
            
            .transactionItem {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
            
            .transactionIcon {
              marginRight: 0;
              marginBottom: 10px;
            }
            
            .transactionMeta {
              flex-direction: column;
              gap: 5px;
            }
            
            .transactionAmount {
              align-self: flex-end;
              marginTop: 10px;
            }
            
            .monthlySummary > div {
              flex-direction: column;
              gap: 20px;
              text-align: center;
            }
          }
          
          @media (max-width: 640px) {
            .budgetHeader {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .transactionsHeader {
              flex-direction: column;
              align-items: flex-start;
              gap: 15px;
            }
            
            .addButton {
              width: 100%;
              justify-content: center;
            }
            
            .formGrid {
              gridTemplateColumns: 1fr;
            }
            
            .formButtons {
              gridTemplateColumns: 1fr;
            }
            
            .expenseForm {
              width: 95%;
              padding: 20px;
            }
          }
          
          @media (max-width: 480px) {
            .container {
              padding: 12px;
            }
            
            .header {
              marginBottom: 30px;
            }
            
            .title {
              font-size: 1.8rem;
            }
            
            .subtitle {
              font-size: 0.9rem;
            }
            
            .budgetOverview,
            .transactionsCard {
              padding: 20px;
            }
            
            .amountCard {
              padding: 20px;
            }
            
            .amountValue {
              font-size: 1.8rem;
            }
            
            .categoryCard {
              padding: 15px;
            }
            
            .categoryIcon {
              width: 40px;
              height: 40px;
              font-size: 18px;
              marginRight: 12px;
            }
            
            .sectionTitle {
              font-size: 1.2rem;
              margin: 30px 0 15px;
            }
          }
          
          @media (max-width: 360px) {
            .container {
              padding: 10px;
            }
            
            .title {
              font-size: 1.6rem;
            }
            
            .budgetOverview,
            .transactionsCard {
              padding: 15px;
              border-radius: 20px;
            }
            
            .amountCard {
              padding: 15px;
              border-radius: 15px;
            }
            
            .categoryCard {
              padding: 12px;
              border-radius: 15px;
            }
            
            .categoryIcon {
              width: 35px;
              height: 35px;
              font-size: 16px;
              marginRight: 10px;
            }
            
            .monthlySummary {
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BudgetView;