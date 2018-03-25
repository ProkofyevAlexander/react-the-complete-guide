import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Container from '../../../hoc/Container/Conteiner';

const sideDrawer = (props) => {
    const attachedClasses = [
        classes.SideDrawer,
        props.open
            ? classes.Open
            : classes.Close
    ]
        .join(' ');
    return (
        <Container>
            <Backdrop
                show={props.open}
                clicked={props.closed}/>
            <div className={attachedClasses}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Container>
    );
};

export default sideDrawer;
