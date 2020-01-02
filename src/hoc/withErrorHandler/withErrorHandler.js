import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = ( WrappedComponent, axios ) => {
   return class extends Component {
      state = {
         error: null
      }
      
      componentDidMount () {
         axios.interceptors.request.use(req => {
            this.setState({error: null}); //this will clear any errors
            return req;
         });
         axios.interceptors.response.use(res => res, error => {
            this.setState({error: error}) //the error value here is the second argument in the use method and it is an object from my Firebase server. It shows in the modal.
         });
      }

      errorConfirmedHandler = () => {
         this.setState({error: null});
      }

      render () {
         return (
      <Aux>
         <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
           {this.state.error ? this.state.error.message : null}
         </Modal>
         <WrappedComponent {...this.props} />
      </Aux>
         );
      }
   }
}

export default withErrorHandler