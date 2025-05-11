import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from '../Validations/UserValidations';
import background from '../Images/bg2.jpeg';
import logo from '../Images/logo.png';
import { registerUser } from '../Features/UserSlice';
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
export default function Register() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [fname,setFname]=useState("")
  const [lname,setLname]=useState("")
  const [email,setemail]=useState("")
  const [password,sepassword]=useState("")
  const [confirmPassword,setcpassword]=useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit =()=> {
  
    const userData={
      fname:fname,
      lname:lname,
      email:email,
      password:password,
    };
    dispatch(registerUser(userData));
     navigate("/login");
    


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
        <div style={{ marginBottom: '25px' }}>
          <input
              type="text"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: `1px solid ${errors.fname ? '#ff4444' : '#ddd'}`,
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your Frist Name"
              {...register("fname",{onChange:(e)=>setFname(e.target.value)})}
            />
             {errors.fname && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.fname.message}</p>
            )}
            </div>
            <div style={{ marginBottom: '25px' }}>
          <input
              type="text"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: `1px solid ${errors.lname ? '#ff4444' : '#ddd'}`,
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your Last Name"
              {...register("lname",{onChange:(e)=>setLname(e.target.value)})}
            />
             {errors.lname && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.lname.message}</p>
            )}
            </div>
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
              {...register("email",{onChange:(e)=>setemail(e.target.value)})}
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
              {...register("password",{onChange:(e)=>sepassword(e.target.value)})}
            />
            {errors.password && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.password.message}</p>
            )}
          </div>
          <div style={{ marginBottom: '25px' }}>
           
            <input
              type="password"
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: '6px',
                border: `1px solid ${errors.confirmPassword ? '#ff4444' : '#ddd'}`,
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Confirm your password"
              {...register("confirmPassword",{onChange:(e)=>setcpassword(e.target.value)})}
            />
            {errors.confirmPassword && (
              <p style={{
                color: '#ff4444',
                fontSize: '14px',
                marginTop: '5px'
              }}>{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            //type="button"
          
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
            SIGN UP
          </button>

          <p style={{
            textAlign: 'center',
            color: '#666',
            marginTop: '20px'
          }}>
            All Ready Have Account? <a href="/login" style={{
              color: '#2e8b57',
              fontWeight: '500',
              textDecoration: 'none'
            }}>LOGIN IN</a>
          </p>
        </form>
      </div>
    </div>
  );
}