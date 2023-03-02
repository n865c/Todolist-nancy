import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {MoonIcon,SunIcon} from '../Icons';
import {Theme} from '../../theme';
import { AppThemeContext } from '../../providers/theme';
export const Header = () => {
  const {currentTheme,setTheme}= useContext(AppThemeContext);
  const setCurrentTheme=()=>{
    const newTheme=currentTheme===Theme.DARK?Theme.LIGHT:Theme.DARK;
  setTheme && setTheme(newTheme);
  };
  return (
    <div>
      <header>
        <Grid container justifyContent="right">
        <Link to="/login">Login</Link>
        </Grid>
        <Grid container justifyContent={"space-between"} mt={5} mb={3}>
          <h2>TODO</h2>
          <IconButton 
          color="primary" 
          aria-label="theme switcher">
         {currentTheme===Theme.DARK?<SunIcon/>: <MoonIcon/>}
          </IconButton>
        </Grid>
      </header>
    </div>
  )
}
