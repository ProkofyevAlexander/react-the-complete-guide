import React from 'react';
import Container from '../../hoc/Conteiner';
import classes from './Layout.css';

const layout = (props) => (
    <Container>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Container>
);

export default layout;