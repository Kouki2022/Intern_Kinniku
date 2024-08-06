import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, CardContent, Typography, Avatar, Button, Box,
  ThemeProvider, createTheme, styled, Paper
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { keyframes } from '@emotion/react';
import './CommonStyles.css';


const theme = createTheme({
    palette: {
      primary: {
        main: '#ff4081',
      },
    },
  });
  
  const UserCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    marginLeft:'2vh',
    marginRight:'2vh',
    marginBottom: theme.spacing(2),
  }));
  
  const arrowAnimation = keyframes`
    0%, 10% {
      transform: translateY(0);
    }
    10% {
      transform: translateY(-10px);
    }
  `;
  
  const AnimatedArrowContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2, 0),
    '& svg': {
      animation: `${arrowAnimation} 2.0s ease-in-out infinite`,
    },
  }));
  
  const Amount = styled(Typography)(({ theme }) => ({
    textAlign: 'center',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  }));
  
  const Message = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }));

const BackButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const PaymentFlow = () => {
  const [balance, setBalance] = useState(1000);
  const transferAmount = 3000;
  const navigate = useNavigate();

  const isTransferPossible = balance >= transferAmount;

  return (
    <div>
        <div className="common-header">
            <button className="common-back-button" onClick={() => navigate('/')}>
            戻る
            </button>
            <h1>支払い画面</h1>
         </div>
    
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 3, position: 'relative' }}>

    
        <Card sx={{ 
          pt: 8, 
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }}>
          <Box sx={{top: 30, left: 20, right: 20 }}>
            <UserCard elevation={3}>
              <Avatar sx={{ mr: 2 }}>S</Avatar>
              <Box>
                <Typography variant="subtitle1">サンプル 氏名</Typography>
                <Typography variant="body2" color="text.secondary">
                  送金先
                </Typography>
              </Box>
            </UserCard>
          </Box>
          
          <AnimatedArrowContainer>
            <ArrowUpwardIcon color="primary" fontSize="large" />
          </AnimatedArrowContainer>
          
          <UserCard elevation={3}>
            <Avatar sx={{ mr: 2 }}>A</Avatar>
            <Box>
              <Typography variant="subtitle1">あなた</Typography>
              <Typography variant="body2" color="text.secondary">
                送金元
              </Typography>
            </Box>
          </UserCard>
          
          <CardContent>
            <Amount variant="h4" component="div">
              ¥{transferAmount.toLocaleString()}
            </Amount>

            <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
              残高: ¥{balance.toLocaleString()}
            </Typography>

            <Message>
              <Typography variant="body2">
                メッセージ：飲み会代お願いします！
              </Typography>
            </Message>

            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={!isTransferPossible}
            >
              {isTransferPossible ? '送金する' : '残高不足'}
            </Button>
            
            {!isTransferPossible && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                送金金額が残高を超えています。
              </Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
    </div>
  );
};

export default PaymentFlow;