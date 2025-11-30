import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Avatar,
  Stack,
  Card,
  CardContent,
  Fade,
  Slide,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  CheckCircle,
  Celebration,
  EmojiEvents,
  Security,
  Dashboard,
  Home,
  Person
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const DashBoard = () => {
  const [showContent, setShowContent] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Slide in={showContent} direction="up" timeout={500}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, md: 6 },
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 150,
                height: 150,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                opacity: 0.1
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #4CAF50, #8BC34A)',
                opacity: 0.1
              }}
            />

            {/* Main Content */}
            <Fade in={showContent} timeout={800}>
              <Box>
                {/* Success Icon */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    mb: 3
                  }}
                >
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      bgcolor: 'success.main',
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)'
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 60 }} />
                  </Avatar>
                  <Celebration
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -20,
                      fontSize: 40,
                      color: 'warning.main',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                </Box>

                {/* Welcome Message */}
                <Typography
                  variant="h3"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    background: 'linear-gradient(45deg, #1976d2, #21CBF3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 2
                  }}
                >
                  Bem vindo!
                </Typography>

                <Typography
                  variant="h5"
                  component="h2"
                  color="text.secondary"
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  You've successfully signed in to your account
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    maxWidth: '500px',
                    mx: 'auto',
                    mb: 4,
                    lineHeight: 1.6
                  }}
                >
                  Congratulations on your successful login! You now have access to all 
                  the features and resources available in your account. 
                  We're redirecting you to your dashboard in a few seconds.
                </Typography>

                <Fade in={showContent} timeout={1000}>
                  <Card
                    sx={{
                      mb: 4,
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                      border: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <CardContent>
                      <Stack
                        direction={isMobile ? 'column' : 'row'}
                        spacing={3}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <EmojiEvents
                            sx={{
                              fontSize: 40,
                              color: 'warning.main',
                              mb: 1
                            }}
                          />
                          <Typography variant="h6" fontWeight="bold">
                            Member Since
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {new Date().toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric'
                            })}
                          </Typography>
                        </Box>

                        <Box sx={{ textAlign: 'center' }}>
                          <Security
                            sx={{
                              fontSize: 40,
                              color: 'success.main',
                              mb: 1
                            }}
                          />
                          <Typography variant="h6" fontWeight="bold">
                            Account Status
                          </Typography>
                          <Typography variant="body2" color="success.main">
                            Verified ✓
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              </Box>
            </Fade>
          </Paper>
        </Slide>
      </Container>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};

export default DashBoard;