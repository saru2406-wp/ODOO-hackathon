import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TripForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: "",
    tripType: "leisure",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "",
    description: "",
    interests: [],
    accommodation: "",
    transportation: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const popularDestinations = [
    { name: "Tokyo, Japan", emoji: "🗼", color: "#FF6B6B" },
    { name: "Paris, France", emoji: "🗼", color: "#4ECDC4" },
    { name: "Bali, Indonesia", emoji: "🏝️", color: "#45B7D1" },
    { name: "New York, USA", emoji: "🗽", color: "#96E6A1" },
  ];

  const interestOptions = [
    { id: 1, name: "Food & Dining", emoji: "🍽️", color: "#FF9E7D" },
    { id: 2, name: "Culture & History", emoji: "🏛️", color: "#A3C4F3" },
    { id: 3, name: "Nature & Hiking", emoji: "🏞️", color: "#96E6A1" },
    { id: 4, name: "Beach & Relax", emoji: "🏖️", color: "#4ECDC4" },
    { id: 5, name: "Shopping", emoji: "🛍️", color: "#F0C987" },
    { id: 6, name: "Nightlife", emoji: "🌃", color: "#8B5CF6" },
  ];

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
    },
    progressBar: {
      height: '6px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '3px',
      margin: '40px auto 60px',
      maxWidth: '1200px',
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
    },
    progressFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      background: 'linear-gradient(90deg, #FFD166, #06D6A0)',
      borderRadius: '3px',
      transition: 'width 0.5s ease',
      width: `${(step / 3) * 100}%`,
    },
    formContainer: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '30px',
      padding: '50px',
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      boxShadow: '0 40px 60px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'slideUp 0.6s ease',
      boxSizing: 'border-box',
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '40px',
      position: 'relative',
      width: '100%',
      padding: '0 20px',
    },
    stepCircle: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '22px',
      zIndex: 2,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      flexShrink: 0,
    },
    stepLine: {
      position: 'absolute',
      top: '30px',
      left: '10%',
      right: '10%',
      height: '4px',
      background: 'rgba(0, 0, 0, 0.1)',
      zIndex: 1,
    },
    destinationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      margin: '30px 0',
      width: '100%',
    },
    destinationCard: {
      padding: '25px',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      border: '2px solid transparent',
      boxSizing: 'border-box',
      minHeight: '150px',
      justifyContent: 'center',
    },
    inputGroup: {
      marginBottom: '30px',
      position: 'relative',
      width: '100%',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: '500',
      color: '#333',
      fontSize: '16px',
      width: '100%',
    },
    input: {
      width: '100%',
      padding: '18px 20px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '15px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '18px 20px',
      fontSize: '16px',
      border: '2px solid #e0e0e0',
      borderRadius: '15px',
      background: 'white',
      transition: 'all 0.3s ease',
      outline: 'none',
      fontFamily: "'Poppins', sans-serif",
      minHeight: '150px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '40px',
      gap: '20px',
      width: '100%',
    },
    button: {
      flex: 1,
      padding: '20px 30px',
      border: 'none',
      borderRadius: '15px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      boxSizing: 'border-box',
      minHeight: '60px',
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
    },
    secondaryButton: {
      background: 'rgba(0, 0, 0, 0.05)',
      color: '#666',
    },
    interestGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '15px',
      margin: '30px 0',
      width: '100%',
    },
    interestCard: {
      padding: '20px',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      border: '2px solid transparent',
      background: 'rgba(255, 255, 255, 0.9)',
      boxSizing: 'border-box',
      minHeight: '100px',
    },
    budgetSlider: {
      margin: '40px 0',
      padding: '30px',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      width: '100%',
      boxSizing: 'border-box',
    },
    slider: {
      width: '100%',
      height: '10px',
      WebkitAppearance: 'none',
      background: 'linear-gradient(90deg, #FFD166, #06D6A0)',
      borderRadius: '5px',
      outline: 'none',
      marginTop: '20px',
    },
    sliderThumb: {
      WebkitAppearance: 'none',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      background: '#667eea',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
      border: '3px solid white',
    },
    animationElements: {
      position: 'absolute',
      pointerEvents: 'none',
    },
    successAnimation: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease',
      width: '100vw',
      height: '100vh',
    },
    formContent: {
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    dateGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      width: '100%',
      marginBottom: '30px',
    },
    summarySection: {
      background: 'linear-gradient(135deg, #667eea20, #764ba220)',
      padding: '30px',
      borderRadius: '20px',
      marginTop: '30px',
      textAlign: 'center',
      width: '100%',
      boxSizing: 'border-box',
    },
    travelerCounter: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      width: '100%',
      justifyContent: 'center',
    },
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInterestClick = (interest) => {
    setSelectedInterests(prev => {
      if (prev.includes(interest.id)) {
        return prev.filter(id => id !== interest.id);
      } else {
        return [...prev, interest.id];
      }
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const renderStep1 = () => (
    <div style={styles.formContent}>
      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        background: 'linear-gradient(90deg, #667eea, #764ba2)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        width: '100%'
      }}>
        Where to? ✈️
      </h2>
      <p style={{color: '#666', marginBottom: '30px', textAlign: 'center'}}>Choose your dream destination</p>
      
      <div style={styles.destinationGrid}>
        {popularDestinations.map((dest, index) => (
          <div
            key={index}
            style={{
              ...styles.destinationCard,
              background: dest.color + '20',
              borderColor: formData.destination === dest.name ? dest.color : 'transparent',
              transform: formData.destination === dest.name ? 'translateY(-5px) scale(1.05)' : 'none',
              boxShadow: formData.destination === dest.name ? '0 10px 30px rgba(0, 0, 0, 0.15)' : 'none',
            }}
            onClick={() => setFormData({...formData, destination: dest.name})}
            onMouseEnter={(e) => {
              if (formData.destination !== dest.name) {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (formData.destination !== dest.name) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{fontSize: '50px', marginBottom: '15px'}}>{dest.emoji}</div>
            <h3 style={{margin: '0', color: '#333', fontSize: '1.3rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{dest.name}</h3>
          </div>
        ))}
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Or enter custom destination</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => setFormData({...formData, destination: e.target.value})}
          placeholder="e.g., Rome, Italy"
          style={{
            ...styles.input,
            borderColor: formData.destination ? '#667eea' : '#e0e0e0',
            boxShadow: formData.destination ? '0 0 0 2px rgba(102, 126, 234, 0.1)' : 'none',
          }}
        />
      </div>

      <div style={styles.dateGrid}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Start Date</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>End Date</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            style={styles.input}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div style={styles.formContent}>
      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        background: 'linear-gradient(90deg, #667eea, #764ba2)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        width: '100%'
      }}>
        Interests & Budget 💰
      </h2>
      <p style={{color: '#666', marginBottom: '30px', textAlign: 'center'}}>What do you enjoy doing?</p>
      
      <div style={styles.interestGrid}>
        {interestOptions.map((interest) => (
          <div
            key={interest.id}
            style={{
              ...styles.interestCard,
              background: selectedInterests.includes(interest.id) ? interest.color + '40' : 'white',
              borderColor: selectedInterests.includes(interest.id) ? interest.color : 'transparent',
              transform: selectedInterests.includes(interest.id) ? 'scale(1.05)' : 'none',
              boxShadow: selectedInterests.includes(interest.id) ? '0 10px 30px rgba(0, 0, 0, 0.15)' : 'none',
            }}
            onClick={() => handleInterestClick(interest)}
            onMouseEnter={(e) => {
              if (!selectedInterests.includes(interest.id)) {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!selectedInterests.includes(interest.id)) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            <div style={{fontSize: '35px', flexShrink: 0}}>{interest.emoji}</div>
            <div style={{flex: 1, minWidth: 0}}>
              <h4 style={{
                margin: '0', 
                color: '#333',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{interest.name}</h4>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.budgetSlider}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
          <label style={{...styles.label, marginBottom: 0}}>Budget Range</label>
          <span style={{fontSize: '1.8rem', fontWeight: '700', color: '#667eea'}}>
            ${formData.budget || '0'}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={formData.budget || 1000}
          onChange={(e) => setFormData({...formData, budget: e.target.value})}
          style={styles.slider}
        />
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '10px', width: '100%'}}>
          <span style={{color: '#666', fontSize: '14px'}}>$100</span>
          <span style={{color: '#666', fontSize: '14px'}}>$10,000+</span>
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Number of Travelers</label>
        <div style={styles.travelerCounter}>
          <button
            type="button"
            onClick={() => setFormData({...formData, travelers: Math.max(1, formData.travelers - 1)})}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid #667eea',
              background: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            -
          </button>
          <div style={{fontSize: '2.5rem', fontWeight: '700', minWidth: '80px', textAlign: 'center'}}>
            {formData.travelers}
          </div>
          <button
            type="button"
            onClick={() => setFormData({...formData, travelers: formData.travelers + 1})}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              border: '2px solid #667eea',
              background: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            +
          </button>
          <span style={{marginLeft: '20px', color: '#666', fontSize: '1.1rem'}}>👥 travelers</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div style={styles.formContent}>
      <h2 style={{
        fontSize: '2.5rem', 
        marginBottom: '20px', 
        background: 'linear-gradient(90deg, #667eea, #764ba2)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
        width: '100%'
      }}>
        Almost there! 🎉
      </h2>
      <p style={{color: '#666', marginBottom: '30px', textAlign: 'center'}}>Add some final details</p>
      
      <div style={styles.inputGroup}>
        <label style={styles.label}>Trip Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Tell us about your trip plans, what you're looking forward to, or any special requirements..."
          style={{
            ...styles.textarea,
            borderColor: formData.description ? '#667eea' : '#e0e0e0',
            boxShadow: formData.description ? '0 0 0 2px rgba(102, 126, 234, 0.1)' : 'none',
          }}
        />
      </div>

      <div style={{...styles.dateGrid, marginBottom: '30px'}}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Accommodation Type</label>
          <select
            value={formData.accommodation}
            onChange={(e) => setFormData({...formData, accommodation: e.target.value})}
            style={styles.input}
          >
            <option value="">Select type</option>
            <option value="hotel">🏨 Hotel</option>
            <option value="airbnb">🏠 Airbnb/Vacation Rental</option>
            <option value="hostel">🛏️ Hostel</option>
            <option value="resort">🏖️ Resort</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Transportation</label>
          <select
            value={formData.transportation}
            onChange={(e) => setFormData({...formData, transportation: e.target.value})}
            style={styles.input}
          >
            <option value="">Select type</option>
            <option value="flight">✈️ Flight</option>
            <option value="train">🚆 Train</option>
            <option value="car">🚗 Car Rental</option>
            <option value="mixed">🔀 Mixed</option>
          </select>
        </div>
      </div>

      <div style={styles.summarySection}>
        <h3 style={{margin: '0 0 15px', color: '#333', fontSize: '1.5rem'}}>Trip Summary</h3>
        <p style={{color: '#666', margin: '0', fontSize: '1.1rem'}}>
          {formData.destination ? `${formData.destination} • ` : 'No destination selected • '}
          {formData.travelers} traveler{formData.travelers > 1 ? 's' : ''} • 
          Budget: ${formData.budget || '0'}
        </p>
      </div>
    </div>
  );

  const steps = [
    { number: 1, label: "Destination", emoji: "📍" },
    { number: 2, label: "Details", emoji: "✏️" },
    { number: 3, label: "Review", emoji: "📋" },
  ];

  return (
    <div style={styles.container}>
      {/* Animated Background Elements */}
      <div style={{
        ...styles.animationElements,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(102,126,234,0.2) 0%, rgba(118,75,162,0) 70%)',
        borderRadius: '50%',
        top: '10%',
        left: '5%',
        animation: 'pulse 4s infinite',
      }} />
      
      <div style={styles.progressBar}>
        <div style={styles.progressFill} />
      </div>

      <div style={styles.formContainer}>
        <div style={styles.stepIndicator}>
          <div style={styles.stepLine} />
          {steps.map((s) => (
            <div
              key={s.number}
              style={{
                ...styles.stepCircle,
                background: step >= s.number ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'white',
                color: step >= s.number ? 'white' : '#999',
                boxShadow: step >= s.number ? '0 8px 25px rgba(102, 126, 234, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
                transform: step === s.number ? 'scale(1.15)' : 'scale(1)',
              }}
              onClick={() => step > s.number && setStep(s.number)}
              onMouseEnter={(e) => step > s.number && (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => step > s.number && (e.currentTarget.style.transform = 'scale(1)')}
            >
              {step > s.number ? '✓' : s.emoji}
            </div>
          ))}
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div style={styles.buttonGroup}>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              style={{...styles.button, ...styles.secondaryButton}}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px) scale(1.02)'}
              onMouseLeave={(e) => e.target.style.transform = 'none'}
            >
              ← Previous
            </button>
          )}
          
          <button
            type="button"
            onClick={step < 3 ? handleNext : handleSubmit}
            style={{
              ...styles.button,
              ...styles.primaryButton,
              opacity: isSubmitting ? 0.8 : 1,
              marginLeft: step === 1 ? 'auto' : '0',
              maxWidth: step === 1 ? '300px' : 'none',
            }}
            disabled={isSubmitting}
            onMouseEnter={(e) => !isSubmitting && (e.target.style.transform = 'translateY(-3px) scale(1.02)')}
            onMouseLeave={(e) => !isSubmitting && (e.target.style.transform = 'none')}
          >
            {isSubmitting ? (
              <>
                <div style={{width: '22px', height: '22px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />
                Creating Trip...
              </>
            ) : step < 3 ? (
              <>
                Continue →
                <span style={{fontSize: '22px'}}>🚀</span>
              </>
            ) : (
              <>
                Complete Trip!
                <span style={{fontSize: '22px'}}>🎉</span>
              </>
            )}
          </button>
        </div>
      </div>

      {isSubmitting && (
        <div style={styles.successAnimation}>
          <div style={{
            background: 'white',
            padding: '60px',
            borderRadius: '30px',
            textAlign: 'center',
            animation: 'scaleIn 0.5s ease',
            maxWidth: '500px',
            width: '90%',
            boxSizing: 'border-box',
          }}>
            <div style={{fontSize: '70px', marginBottom: '25px', animation: 'bounce 1s infinite'}}>
              ✈️
            </div>
            <h2 style={{margin: '0 0 15px', color: '#333', fontSize: '2rem'}}>Creating Your Trip!</h2>
            <p style={{color: '#666', margin: '0', fontSize: '1.1rem'}}>Sit back while we plan your adventure...</p>
          </div>
        </div>
      )}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.3;
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
              transform: scale(0.8);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: #667eea;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            border: 3px solid white;
          }
          
          select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 20px center;
            background-size: 20px;
            padding-right: 50px !important;
          }
          
          textarea {
            font-family: 'Poppins', sans-serif;
          }
          
          @media (max-width: 1200px) {
            .formContainer {
              padding: 40px;
            }
          }
          
          @media (max-width: 768px) {
            .container {
              padding: 15px;
            }
            
            .formContainer {
              padding: 30px 20px;
              border-radius: 25px;
            }
            
            .stepCircle {
              width: 50px;
              height: 50px;
              font-size: 20px;
            }
            
            .stepLine {
              top: 25px;
            }
            
            .destinationGrid,
            .interestGrid {
              grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
              gap: 15px;
            }
            
            .destinationCard {
              padding: 20px;
              min-height: 130px;
            }
            
            h2 {
              font-size: 2rem !important;
            }
            
            .buttonGroup {
              flex-direction: column;
              gap: 15px;
            }
            
            .button {
              width: 100%;
            }
            
            .dateGrid {
              grid-template-columns: 1fr;
            }
          }
          
          @media (max-width: 480px) {
            .formContainer {
              padding: 25px 15px;
              border-radius: 20px;
            }
            
            .stepIndicator {
              padding: 0 10px;
            }
            
            .stepCircle {
              width: 40px;
              height: 40px;
              font-size: 18px;
            }
            
            .stepLine {
              left: 5%;
              right: 5%;
            }
            
            .destinationGrid,
            .interestGrid {
              grid-template-columns: 1fr;
            }
            
            h2 {
              font-size: 1.8rem !important;
            }
            
            .travelerCounter {
              gap: 15px;
            }
            
            button[type="button"] {
              width: 50px;
              height: 50px;
              font-size: 24px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TripForm;