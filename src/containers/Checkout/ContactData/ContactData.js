import React, { Component } from 'react';
import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
   state = {
      name: '',
      email: '',
      address: {
         street: '',
         city: '',
         state: '',
         zipCode: '' 
      }
   }

   render () {

      return(
         <div className={classes.ContactData}>
            <h4>Please Enter Your Contact Information</h4>
            <form>
               <input className={classes.Input} type='text' name='name' placeholder='Your Name'></input>
               <input className={classes.Input} type='email' name='email' placeholder='Your Email'></input>
               <input className={classes.Input} type='text' name='street' placeholder='Your Street Address'></input>
               <input className={classes.Input} type='text' name='city' placeholder='Your City'></input>
               <input className={classes.Input} type='text' name='state' placeholder='Your State'></input>
               <input className={classes.Input} type='text' name='zip' placeholder='Your Zip Code'></input>
               <Button btnType='Success'>&nbsp;CLICK HERE TO PLACE YOUR ORDER</Button>
            </form>
         </div>
      );

   }

}

export default ContactData;