import React, { useState } from 'react';  
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser =({
    
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password

    })        
    const response = await axios.post('{import.meta.env.VITE_BASE_URL}/users/register', newUser);
    if (response.status === 201) {
      const data = response.data;
      setUserData(data.User);
      localStorage.setItem('token', data.token);
      navigate('/login');
              }
     setEmail('');
     setPassword('');
     setFirstName('');
     setLastName('');
  }
              }