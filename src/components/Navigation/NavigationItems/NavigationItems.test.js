import React from 'react';

//import the configure function from enzyme; (import shallow helper function)
import { configure, shallow } from 'enzyme';

//configures enzyme and connects it to my react version
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';

import NavigationItem from './NavigationItem/NavigationItem';



//execute configure function and pass a JavaScript object with the adapter property with its assigned value being the Adapter constructor function. That is... adapter is instanciated with new Adapter()
configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
   it('should render two <NavigationItem /> elements if not authenticated', () => {
      const wrapper = shallow(<NavigationItems />);
      
      //expect method is made gloablly available by Jest. 
      //find method is made available by enzyme.
      // utility method is made available by Jest.
      expect(wrapper.find(NavigationItem)).toHaveLength(2);
   });
});