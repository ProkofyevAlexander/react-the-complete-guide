import React, { Component } from 'react';
import classes from './Modal.css';
import Container from '../../../hoc/Conteiner';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps) {
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Container>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? 'translateY(0)'
                            : 'translateY(-100vh)',
                        opacity: this.props.show
                            ? '1'
                            : '0'
                    }}>
                    {this.props.children}
                </div>
            </Container>
        );
    }
}

export default Modal;
