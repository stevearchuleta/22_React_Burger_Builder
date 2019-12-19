import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {

   //...conditionally attach css classes, before returning(), to play animation when drawer opens. .Open class. .Close Class.
   return(
      <div className={classes.SideDrawer}>
         <Logo />
         <nav>
            <NavigationItems />
         </nav>
      </div>
   ); 
};

export default sideDrawer;