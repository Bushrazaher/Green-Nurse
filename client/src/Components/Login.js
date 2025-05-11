import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchemaValidation } from '../Validations/LoginValidation';
import background from '../Images/bg2.jpeg';
import logo from '../Images/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Features/UserSlice';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Login() {
  const { user, isLogin, msg}  = useSelector((state) => state.users);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchemaValidation),
  });
   const dispatch=useDispatch();
   const navigate=useNavigate();
  const onSubmit =async (data) => {
    const userData={
      email:email,
      password:password
    }
   try {
    await dispatch(login(userData)).unwrap();
    navigate('/home');
  } catch (error) {
    // Handle error (optional)
    console.error('Login failed:', error);
  }
  };
  

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(250, 249, 249, 0.36)',
        borderRadius: '10px',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <img 
          src={logo} 
          alt="Company Logo" 
          style={{ 
            width: '180px',
            height: 'auto',
            margin: '0 auto 30px',
            display: 'block'
          }} 
        />

        <form onSubmit={handleSubmit(onSubmit)}>

          <div style={{ marginBottom: '20px' }}>
            
            <input
              type="email"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: `1px solid ${errors.email ? '#ff4444' : '#ddd'}`,
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              {...register("email",{onChange:e=>setemail(e.target.value)})}
            />
            {errors.email && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.email.message}</p>
            )}
          </div>

          <div style={{ marginBottom: '25px' }}>
           
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: `1px solid ${errors.password ? '#ff4444' : '#ddd'}`,
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              {...register("password",{onChange:e=>setpassword(e.target.value)})}
            />
            {errors.password && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2e8b57',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'background-color 0.3s',
              ':hover': {
                backgroundColor: '#3aa76d'
              }
            }}
          >
            SIGN IN
          </button>

          <p style={{
            textAlign: 'center',
            color: '#666',
            marginTop: '20px'
          }}>
            Not Registered? <a href="/register" style={{
              color: '#2e8b57',
              fontWeight: '500',
              textDecoration: 'none'
            }}>Register Now</a>
          </p>
        </form>
      </div>
    </div>
  );
}
