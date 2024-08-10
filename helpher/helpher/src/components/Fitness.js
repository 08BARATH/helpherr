import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './FitnessTips.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E37383',
    },
  },
});

const tips = {
  cardio: [
    {
      title: 'Running',
      description: 'Running is a great way to burn calories and improve cardiovascular health.',
      image: 'https://img.freepik.com/free-photo/full-shot-fit-woman-running-outdoors_23-2150255876.jpg?t=st=1722163703~exp=1722167303~hmac=a08f0fca79fe7c7edf0c67f05efae7c9160c1463a21ae7d2f6088ed734d33c19&w=996'
    },
    {
      title: 'Cycling',
      description: 'Cycling can help improve your cardiovascular fitness and burn calories.',
      image: 'https://img.freepik.com/free-photo/close-up-cyclist-woman-outdors_23-2149647425.jpg?t=st=1722163276~exp=1722166876~hmac=94cbbc4272a412443318689ef36ca8d65eda63621b446cf1557cde189dbc0fb9&w=996'
    },
  ],
  strength: [
    {
      title: 'Weight Lifting',
      description: 'Weight lifting helps build muscle mass and strength.',
      image: 'https://img.freepik.com/free-photo/sporty-fit-young-woman-has-well-developed-muscles-by-strength-training-raises-dumbbell-has-training-gym-keeps-hand-waist-poses-against-pink-background-blank-copy-space-your-promotion_273609-59727.jpg?uid=R126215148&ga=GA1.1.396980901.1721889273'
    },
    {
      title: 'Bodyweight Exercises',
      description: 'Exercises like push-ups and squats are effective for building strength.',
      image: 'https://img.freepik.com/free-photo/portrait-disabled-woman-with-prosthetic-leg-working-out_23-2150520880.jpg?uid=R126215148&ga=GA1.1.396980901.1721889273&semt=ais_user-customized'
    },
  ],
  flexibility: [
    {
      title: 'Yoga',
      description: 'Yoga improves flexibility, balance, and overall mental health.',
      image: 'https://img.freepik.com/free-photo/woman-balancing-one-leg-stretching-body_1262-6321.jpg?t=st=1722164188~exp=1722167788~hmac=e6a4138426233c934f1d5e9d012531712ff5617258138dd6eb6f8b9876e776a9&w=996'
    },
    {
      title: 'Stretching',
      description: 'Regular stretching helps improve flexibility and reduce injury risk.',
      image: 'https://img.freepik.com/free-photo/yoga-outdoors-reverse-warrior-pose_1163-2637.jpg?t=st=1722163361~exp=1722166961~hmac=fc308ceed0b62359b00514eefc398ea130d3256bc31f46b96d0e6c7bf2e032ed&w=996'
    },
  ],
};

const FitnessTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('cardio');

  return (
    <ThemeProvider theme={theme}>
      <Box className="fitness-bg">
        <Box className="fitness-container">
          <Typography variant="h4" align="center" gutterBottom>
            FITNESS TIPS
          </Typography>
          <Box className="button-group">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedCategory('cardio')}
              className={selectedCategory === 'cardio' ? 'active' : ''}
            >
              Cardio
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedCategory('strength')}
              className={selectedCategory === 'strength' ? 'active' : ''}
            >
              Strength
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedCategory('flexibility')}
              className={selectedCategory === 'flexibility' ? 'active' : ''}
            >
              Flexibility
            </Button>
          </Box>
          <Box className="tips-grid">
            {tips[selectedCategory].map((tip, index) => (
              <Card key={index} className="tip-card">
                <CardMedia
                  component="img"
                  height="140"
                  image={tip.image}
                  alt={tip.title}
                />
                <CardContent>
                  <Typography variant="h6">{tip.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {tip.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FitnessTips;
