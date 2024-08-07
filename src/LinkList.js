import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
  Box,
  Divider
} from '@mui/material';
import {
   ContentCopy as ContentCopyIcon,
   Send as SendIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const RequestLink = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const now = new Date();
    setCurrentDateTime(now.toISOString().replace(/[:.]/g, ''));
  }, []);

  const generateLink = (index) => {
    const userId = index + 1; // インデックスは0から始まるので、1を加えてuserIdを生成
    return `http://localhost:3000/transition/${currentDateTime}/${userId}`;
  };

  const recipients = [
    { name: "山田太郎", link: generateLink(0) },
    { name: "鈴木花子", link: generateLink(1) }
  ];

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setSnackbarMessage('リンクをコピーしました！');
    setSnackbarOpen(true);
  };

  const handleTop = () => {
    navigate('/');
  };

  const handleForward = (link) => {
    console.log(`リンクを転送する: ${link}`);
    setSnackbarMessage('リンクを転送しました！');
    setSnackbarOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ backgroundColor: '#555', color: 'white' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            リンク作成完了
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontSize: {
              xs: '1.5rem',
              sm: '2rem',
              md: '2.5rem'
            },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          請求リンクが作成されました
        </Typography>
        {recipients.map((recipient, index) => (
          <Card key={index} sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                宛名: {recipient.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {recipient.link}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyLink(recipient.link)}
                >
                  コピー
                </Button>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => handleForward(recipient.link)}
                  sx={{ ml: 2 }}
                >
                  転送
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<HomeIcon />}
            onClick={handleTop}
            size="large"
          >
            トップ画面に戻る
          </Button>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
};

export default RequestLink;