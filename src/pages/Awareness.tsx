import React, { useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useSendClickEventMutation } from "../api/apiSlice";

export const Awareness: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [sendEvent] = useSendClickEventMutation()

  useEffect(() => {
    const handleSendEvent = async () => {
      try {
        if (id) {
          await sendEvent(id).unwrap();
          console.log('Event sent successfully');
        }
      } catch (error) {
        console.error('Error sending event:', error);
      }
    };

    handleSendEvent();
  }, []);

  return (
    <Box
      sx={{
        width: 600,
        margin: 'auto',
        mt: 10,
        p: 3,
        textAlign: 'center',
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Phishing Simulation
      </Typography>
      <Typography variant="body1" gutterBottom>
        You have clicked on a simulated phishing link. This is part of a phishing awareness exercise.
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
        Remember: Always verify links in emails before clicking. If in doubt, contact your administrator.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Go to Dashboard
      </Button>
    </Box>
  );
};
