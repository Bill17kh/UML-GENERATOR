import React from 'react';
import { Button, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/um.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing(4),
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '3.5rem',
    marginBottom: theme.spacing(2),
    textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDBDBD',
    fontSize: '1.5rem',
    marginBottom: theme.spacing(4),
    textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
  },
  button: {
    backgroundColor: '#424242',
    color: '#fff',
    padding: theme.spacing(2, 6),
    fontSize: '1.3rem',
    textTransform: 'none',
    borderRadius: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#212121',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.4)',
    },
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    border: '1px solid #757575',
  },
  icon: {
    fontSize: '1.5rem',
    color: '#E0E0E0',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <div className={classes.titleContainer}>
        <Typography variant="h1" className={classes.title}>
          UML Designer
        </Typography>
        <Typography variant="h2" className={classes.subtitle}>
          Create, Design, and Generate Code with Ease
        </Typography>
      </div>
      <Button
        variant="contained"
        className={classes.button}
        component={Link}
        to="/editor"
        startIcon={<EditIcon className={classes.icon} />}
      >
        Start Creating
      </Button>
    </Container>
  );
};

export default Home;
