import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

export const Header = () => {
// TO-DO filter to right
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
      <Link to="/">
        <Typography variant="title" color="inherit" style={ { marginRight: '100px' } }>
          Mission
        </Typography>
      </Link>

        <Button component={Link} color="inherit" variant="text"  to="/" >
          Filter
        </Button>

      </Toolbar>
    </AppBar>
  );
};