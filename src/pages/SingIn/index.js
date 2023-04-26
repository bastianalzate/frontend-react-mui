import React, { useState } from 'react';
import { AlertTitle, Button, TextField, Typography, Fade, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../redux/features/myFeatureSlice';
import { useNavigate } from 'react-router-dom';
const { REACT_APP_API_URL } = process.env;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    user: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const auth = useSelector((state) => state.myFeature.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const inputWidth = isSmallScreen ? '100%' : '500px';
  const buttonWidth = isSmallScreen ? '100%' : '500PX';

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.user !== 'admin' || formData.password !== 'admin') {
      setShowError(true);
    } else {
      setShowError(false);

      setLoading(true);
      try {
        const response = await axios.post(
          `${REACT_APP_API_URL}`,
          formData
        );

        if (response.data === 'Usuario autenticado') {
          dispatch(authUser(true));
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
      }}
    >
      {loading && (
        <CircularProgress style={{ marginBottom: '1rem', width: 36 }} />
      )}
      {showError && (
        <Fade in={showError} timeout={500}>
          <Alert severity="error" style={{ marginBottom: '1rem', width: inputWidth }}>
            <AlertTitle>Error</AlertTitle>
            Usuario o contraseña incorrecta — <strong>verifica tus datos!</strong>
          </Alert>
        </Fade>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <Typography variant="h5" component="h1" style={{ fontWeight: 'bold' }}>
          Sign in {auth}
        </Typography>
      </div>

      <TextField
        label="Usuario"
        variant="outlined"
        name="user"
        value={formData.user}
        onChange={handleInputChange}
        style={{ marginBottom: '1rem', width: inputWidth }}
      />
      <TextField
        label="Contraseña"
        type="password"
        variant="outlined"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        style={{ marginBottom: '1rem', width: inputWidth }}
      />
      <Button
        type="submit"
        variant="contained"
        style={{ width: buttonWidth, marginTop: '50px', padding: '10px' }}
      >
        SIGN IN
      </Button>
    </form>
  );
};

export default LoginForm;

