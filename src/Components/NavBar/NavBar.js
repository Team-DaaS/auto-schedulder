import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export const NavBar = () => {
  return (
    <div>
      <AppBar position="static" elevation={0} color="secondary">
        <Toolbar>
          <Typography variant="h3" component="h1" sx={{flexGrow: 1, textAlign: 'left'}}>
            Soccer Schedule
          </Typography>
          <Button sx={{color:'white'}}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

