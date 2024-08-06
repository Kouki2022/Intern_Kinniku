import React from 'react';
import {
  Box, Typography, List, ListItem, ListItemAvatar, 
  ListItemText, Avatar, ThemeProvider, createTheme,
  Fab
} from '@mui/material';
import { styled } from '@mui/system';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReceiptIcon from '@mui/icons-material/Receipt';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const TransactionList = styled(List)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
}));

const TransactionItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const AmountTypography = styled(Typography)(({ theme, transactionType }) => ({
  fontWeight: 'bold',
  color: transactionType === 'payment' ? theme.palette.secondary.main : theme.palette.success.main,
}));

const MonthDivider = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(1, 2),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const FloatingActionButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

// サンプルデータ（日付順にソート済み）
const transactions = [
  { id: 1, date: '2024-08-06 14:30', user: 'John Doe', amount: 5000, type: 'payment' },
  { id: 2, date: '2024-08-05 10:15', user: 'Jane Smith', amount: 3000, type: 'receive' },
  { id: 3, date: '2024-08-04 18:45', user: 'Bob Johnson', amount: 7500, type: 'payment' },
  { id: 4, date: '2024-07-15 09:00', user: 'Alice Brown', amount: 2000, type: 'receive' },
  { id: 5, date: '2024-07-02 16:20', user: 'Charlie Davis', amount: 4500, type: 'payment' },
  { id: 6, date: '2024-06-28 11:30', user: 'Eva Wilson', amount: 6000, type: 'receive' },
];

const groupTransactionsByMonth = (transactions) => {
  const grouped = {};
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}年${date.getMonth() + 1}月`;
    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }
    grouped[monthYear].push(transaction);
  });
  return grouped;
};

const TransactionHistory = () => {
  const groupedTransactions = groupTransactionsByMonth(transactions);
  const sortedMonths = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          取引履歴
        </Typography>
        {sortedMonths.map(month => (
          <React.Fragment key={month}>
            <MonthDivider variant="h6">{month}</MonthDivider>
            <TransactionList>
              {groupedTransactions[month].map((transaction) => (
                <TransactionItem key={transaction.id}>
                  <ListItemAvatar>
                    <Avatar alt={transaction.user} src={`/api/placeholder/40/40`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={transaction.user}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {new Date(transaction.date).toLocaleString('ja-JP')}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {transaction.type === 'payment' ? (
                      <ArrowUpwardIcon color="secondary" />
                    ) : (
                      <ArrowDownwardIcon color="success" />
                    )}
                    <AmountTypography variant="subtitle1" transactionType={transaction.type}>
                      ¥{transaction.amount.toLocaleString()}
                    </AmountTypography>
                  </Box>
                </TransactionItem>
              ))}
            </TransactionList>
          </React.Fragment>
        ))}
      </Box>
      <FloatingActionButton color="primary" aria-label="請求履歴">
        <ReceiptIcon />
      </FloatingActionButton>
    </ThemeProvider>
  );
};

export default TransactionHistory;