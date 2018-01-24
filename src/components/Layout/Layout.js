import React from 'react';

import Container from '../../hoc/Conteiner';

const layout = (props) => (
    <Container>
        <div>Toolbar, Sidebar, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Container>
);

export default layout;