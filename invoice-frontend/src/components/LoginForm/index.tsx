import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';



export default function FormPropsTextFields() {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const auth = useSelector((state: any) => state.auth);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    setUsername('');
    setPassword('');
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userToken) {
      navigate('/invoices');
    }
  }, [auth.userToken, navigate]);

  return (
      <Box
      component="form"
      sx={{ '& .MuiTextField-root': { mx: 'auto', width: '600px', my: 3 } }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      >
        <Stack spacing={2}>
          <TextField
            value={username}
            required
            id="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            value={password}
            required
            id="password"
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <Box sx={{textAlign: 'center'}}>
            <Button 
            type="submit"
            sx={{ width: '600px'}}
            >Login</Button>
          </Box>
        </Stack>
      </Box>
  );
}
