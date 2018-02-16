import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Container from '../Container/Conteiner';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request
                .use((req) => {
                    this.setState({error: null});
                    return req;
                });
            this.respInterceptor = axios.interceptors.response
                .use(
                    (resp) => resp,
                    (error) => {
                        this.setState({error: error});
                    }
                );
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        };

        render() {
            return (
                <Container>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {
                            this.state.error
                                ? this.state.error.message
                                : null
                        }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Container>
            )
        }
    }
};

export default withErrorHandler;