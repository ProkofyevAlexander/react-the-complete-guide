import React from 'react';
import Container from '../../hoc/Conteiner';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
    <Container>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Container>
);

export default layout;