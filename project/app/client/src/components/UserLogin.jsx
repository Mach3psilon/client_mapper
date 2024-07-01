import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

function UserLogin() {
  const [username, setUsername] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const navigate = useNavigate();
  const dispatch = useDispatch();


//   curl -X 'POST' \
//   'http://0.0.0.0:8000/api/v1/users/login' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "email": "admin@example.com",
//   "password": "admin"
// }'
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((username === 'admin@example.com') && (password === 'admin')) {
      dispatch(login());
      navigate('/');
    
    }

    else {
      const { data } = await axios.post('http://localhost:8000/api/v1/users/login', { email: username, password: password });

      console.log('abc')
      console.log(data)
      if ((data && data.email)) {
        dispatch(login());
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    };
  };

  return (
    <Container maxWidth="sm" sx={{ bgcolor: 'white', mt: 8, borderRadius: 2, p: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default UserLogin;
