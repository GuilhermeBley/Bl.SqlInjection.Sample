import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  useTheme
} from '@mui/material';
import {
  CheckCircle,
  ArrowForward} from '@mui/icons-material';

const DashBoard = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Message Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Welcome Back!
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 3, opacity: 0.9, maxWidth: '800px' }}>
            Congratulations on your successful login! You now have access to all 
            the features and resources available in your account.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.9)'
                }
              }}
              endIcon={<ArrowForward />}
            >
              Go to Dashboard
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Explore Features
            </Button>
          </Box>
        </Box>
      </Paper>

    </Container>
  );
};

export default DashBoard;