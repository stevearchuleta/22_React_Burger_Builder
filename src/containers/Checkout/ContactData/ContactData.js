import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';

import axios from '../../../axios-orders';

class ContactData extends Component {
   state = {
      name: '',
      email: '',
      address: {
         street: '',
         city: '',
         state: '',
         zipCode: '' 
      },
      loading: false
   }

   orderHandler = (event) => {
      event.preventDefault();
      this.setState({ loading: true });
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price,
         customer: {
            name: 'Steve Archuleta',
            address: {
               streetAddress: '6958 Treasure Way',
               city: 'Sacramento',
               state: 'California' 
            },
         email: 'stevearchuleta@me.com'
         },
         deliveryMethod: 'Uber Eats'

      }
      
      axios.post('/orders.json', order)
         .then(response => {
            this.setState({ loading: false });
            this.props.history.push('/')
         } )
         .catch(error => {
            this.setState({ loading: false });
         } );
   }

   render () {
      let form = (
         <form>
         <input className={classes.Input} type='text' name='name' placeholder='Your Name'></input>
         <input className={classes.Input} type='email' name='email' placeholder='Your Email'></input>
         <input className={classes.Input} type='text' name='street' placeholder='Your Street Address'></input>
         <input className={classes.Input} type='text' name='city' placeholder='Your City'></input>
         <input className={classes.Input} type='text' name='state' placeholder='Your State'></input>
         <input className={classes.Input} type='text' name='zip' placeholder='Your Zip Code'></input>
         <Button btnType='Success' clicked={this.orderHandler}>&nbsp;CLICK HERE TO PLACE YOUR ORDER</Button>
      </form>
      );
      if (this.state.loading) {
         form = <Spinner />;
      }
      return(
         <div className={classes.ContactData}>
            <h4>Please Enter Your Contact Information</h4>
           {form}
         </div>
      );

   }

}

export default ContactData;