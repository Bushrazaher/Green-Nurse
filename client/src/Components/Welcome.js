import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import background from '../Images/bg2.jpeg';
import logo from '../Images/logo.png';

export default function Welcome() {
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <div className="App">
      <div className='welcome-container' style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '40px'
      }}>
        {/* Logo */}
        <img 
          src={logo} 
          alt="Company Logo" 
          style={{ 
            maxWidth: '500px', 
            height: 'auto',
            marginBottom: '8px',
            filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.5))'
          }} 
        />
        {/* Continue Button */}
        <button 
          type='submit'
          onClick={handleSubmit}
          style={{
            backgroundColor: '#2e8b57',
            color: 'white',
            border: 'none',
            padding: '12px 40px',
            fontSize: '1rem',
            fontWeight: 'bold',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            marginBottom: '10px'
          }}
        >
          CONTINUE
        </button>
        {/* Social Media Links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          padding: '20px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
            <FaInstagram size={30} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
            <FaFacebook size={30} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'green' }}>
            <FaLinkedin size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}