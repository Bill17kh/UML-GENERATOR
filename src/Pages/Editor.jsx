import React from 'react';
import Navbar from '../components/Navbar';
import DiagramEditor from '../components/DiagramEditor';
import { makeStyles } from '@material-ui/core';
import CodeViewer from '../components/CodeViewer';

const useStyles = makeStyles((theme) => ({
  editorPage: {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: '64px', // Space for navbar
  },
  diagramEditor: {
    flex: 1,
    backgroundColor: '#ffffff',
    backgroundImage: 'linear-gradient(#e1e4e8 1px, transparent 1px), linear-gradient(90deg, #e1e4e8 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    position: 'relative',
    overflow: 'hidden',
  },
}));

const Editor = () => {
  const classes = useStyles();
  return (
    <div className={classes.editorPage}>
      <Navbar />
      <div className={classes.mainContent}>
        <div className={classes.diagramEditor}>
          <DiagramEditor />
        </div>
      </div>
    </div>
  );
};

export default Editor;