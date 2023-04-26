import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const StyledContainer = styled(Container)({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  });

  const Title = styled(Typography)({
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  });

  const SubTitle = styled(Typography)({
    marginBottom: theme.spacing(4),
  });

  return (
    <StyledContainer maxWidth="sm">
      <Title variant="h1">
        404
      </Title>
      <SubTitle variant="h4">
        Página no encontrada
      </SubTitle>
      <Typography variant="body1" paragraph>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>
      <Box>
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          Regresar
        </Button>
      </Box>
    </StyledContainer>
  );
};

export default Error404;
