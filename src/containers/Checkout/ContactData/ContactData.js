import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
   state = {
      orderForm: {
            name: {
               elementType: 'input',
               elementConfig: {
                  type: 'text',
                  placeholder: 'Your Full Name'
               },
               value: ''
            },
            streetAddress: {
               elementType: 'input',
               elementConfig: {
                  type: 'text',
                  placeholder: 'Your Street Address'
               },
               value: ''
            },
            city: {
               elementType: 'input',
               elementConfig: {
                  type: 'text',
                  placeholder: 'Your City'
               },
               value: ''
            },
            state: {
               elementType: 'input',
               elementConfig: {
                  type: 'text',
                  placeholder: 'Your State'
               },
               value: ''
            },
            zipCode: {
               elementType: 'input',
               elementConfig: {
                  type: 'number',
                  placeholder: 'Your Zip Code'
               },
               value: ''
            },
            email: {
               elementType: 'input',
               elementConfig: {
                  type: 'email',
                  placeholder: 'Your Email Address'
               },
               value: ''
            },
            deliveryMethod: {
               elementType: 'select',
               elementConfig: {
                  options: [
                     {value: 'fastest', displayValue: 'Fastest'},
                     {value: 'cheapest', displayValue: 'Cheapest'},
                     {value: 'ubereats', displayValue: 'Uber Eats'},
                     {value: 'doorDash', displayValue: 'Door Dash'},
                     {value: 'grubhub', displayValue: 'Grub Hub'}
                     
                  ]
               },
               value: ''
            },
      },
      loading: false
   }

   orderHandler = (event) => {
      event.preventDefault();
      console.log(this.props.ingredients);
      this.setState( { loading: true } );
      const order = {
         ingredients: this.props.ingredients,
         price: this.props.price
      }
      
      axios.post('/orders.json', order)
         .then(response => {
            this.setState( { loading: false } );
            this.props.history.push('/') //redirect to BurgerBuilder home page
         } )
         .catch(error => {
            this.setState( { loading: false } );
         } );
   }

   render () {
      let form = (
         <form>
         <Input elementType='...' elementConfig='...' value='...'/>
         <Input inputtype="input" type='email' name='email' placeholder='Your Email'/>
         <Input inputtype="input" type='text' name='street' placeholder='Your Street Address'/>
         <Input inputtype="input" type='text' name='city' placeholder='Your City'/>
         <Input inputtype="input" type='text' name='state' placeholder='Your State'/>
         <Input inputtype="input" type='text' name='zip' placeholder='Your Zip Code'/>
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