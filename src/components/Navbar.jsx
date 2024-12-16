import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClass } from '../redux/actions/classesActions';
import {
  setMode,
  setRelationshipType,
  deleteSelectedElement,
} from '../redux/actions/uiActions';
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CodeIcon from '@mui/icons-material/Code';
import { generateCode } from '../utils/generateCode';
import { exportDiagram } from '../utils/exportDiagram';
import { importDiagram } from '../utils/importDiagram';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#2e2e3a',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  button: {
    backgroundColor: '#4a4e69',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#22223b',
    },
  },
  select: {
    minWidth: 150,
    color: '#ffffff',
    '& .MuiSelect-icon': {
      color: '#ffffff',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState('Python');
  const classesState = useSelector((state) => state.classes);
  const relationshipsState = useSelector((state) => state.relationships);

  const handleAddClass = () => {
    dispatch(addClass());
  };

  const handleAddRelationship = (type) => {
    dispatch(setRelationshipType(type));
    dispatch(setMode('addingRelationship'));
  };

  const handleExport = () => {
    const diagramData = exportDiagram(classesState, relationshipsState);
    const blob = new Blob([diagramData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.json';
    a.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          importDiagram(dispatch, data);
        } catch (error) {
          console.error('Error importing diagram:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleGenerateCode = () => {
    setOpen(true);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftSection}>
          <Button
            variant="contained"
            startIcon={<AddBoxIcon />}
            className={classes.button}
            onClick={handleAddClass}
          >
            Add Class
          </Button>
          <Select
            value=""
            displayEmpty
            variant="outlined"
            className={classes.select}
            onChange={(e) => handleAddRelationship(e.target.value)}
          >
            <MenuItem value="" disabled>
              Add Relationship
            </MenuItem>
            <MenuItem value="Association">Association</MenuItem>
            <MenuItem value="Inheritance">Inheritance</MenuItem>
            <MenuItem value="Aggregation">Aggregation</MenuItem>
            <MenuItem value="Composition">Composition</MenuItem>
          </Select>
        </div>

        <div className={classes.rightSection}>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            className={classes.button}
            onClick={() => dispatch(deleteSelectedElement())}
          >
            Delete
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            className={classes.button}
            onClick={handleExport}
          >
            Export
          </Button>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className={classes.button}
            onClick={() => fileInputRef.current.click()}
          >
            Import
          </Button>
          <Button
            variant="contained"
            startIcon={<CodeIcon />}
            className={classes.button}
            onClick={handleGenerateCode}
          >
            Generate Code
          </Button>
        </div>

        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImport}
        />

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Select Target Language</DialogTitle>
          <DialogContent>
            <RadioGroup
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <FormControlLabel value="Python" control={<Radio />} label="Python" />
              <FormControlLabel value="Java" control={<Radio />} label="Java" />
              <FormControlLabel value="PHP" control={<Radio />} label="PHP" />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleGenerateCode} color="primary">
              Generate
            </Button>
          </DialogActions>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;