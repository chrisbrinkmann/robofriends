import React, { Component } from 'react';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

import { connect } from 'react-redux'
import { setSearchField, requestRobots } from '../actions'

// PROPS - variables passed to a react component by its parent
// STATE - variables that are directly initialized and managed by the component

// a parent feeds STATE into a child component
// once the child component receives the state, the STATE becomes a PROP
// the child cannot change the PROP
// STATE is something that can change and affect the app
// STATE usually lives in the parent component and is passed to childrens

// set the props for this component via reducers. state comes from the reducers.js
// which holds the initial states & reducer functions
const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

// calls (dispatch) the action (setSearchField, requestRobots) in response to event
// we store the action in a prop that we called onSearchChange & onRequestRobots
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  } 
}

// we must use class syntax if our component has state
class App extends Component {
  // COMPONENT DOES NOT HAVE STATE WITH REDUX
  // in order to give our parent App component a state,
  // we make a constructor, call super() (to inherit Component constructor)
  // constructor() {
  //     super();

  //     // and then define this.state as an object
  //     // these are our App component states
  //     // these states are passed down as props to the children in render
  //     this.state = {
  //         robots: [],
  //         // searchfield: ''
  //     };
  // }

  async componentDidMount() {
      // fetch('https://jsonplaceholder.typicode.com/users')
      //     .then(response => response.json())
      //     .then(users => this.setState({ robots: users }))

      // same same but uses await instead of .then
      // const resp = await fetch('https://jsonplaceholder.typicode.com/users')
      // const users = await resp.json()
      // this.setState({ robots: users })
    
      // same same using redux
      this.props.onRequestRobots()
  }

  // this is a function for setting state
  // we pass this to SearchBox component as a prop
  // onSearchChange = event => {
  //     this.setState({ searchfield: event.target.value });
  // }

  // the children components (SearchBox, CardList) are pure components (only have props, no state)
  // their only job is to render
  render() {
    // destructure the state object of App
    // so we dont have to always write this.state.<prop>
    // const { robots } = this.state;

    const { searchField, onSearchChange, robots, isPending } = this.props

    // App is managing its own state here
    // it is the only thing that can change it's own state
    // why cant I put this outside of render?
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ?
        <h1>Loading...</h1> :
        (
        // but it can pass its state down as props to its children here
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                {
                    /*We pass App's onSearchChange method to SearchBox's
                      searchChange prop as a it's value.
                      in SearchBox, there is an <input> with an onChange attribute
                      to which we assign the onSearchChange prop passed in from App
                      ?so whenever there is change to input in searchBox
                      ?onSearchChange is fired and App.setState gets assigned the
                      ?value of the event, which is the text in the input?
                    */
                }
                <SearchBox searchChange={onSearchChange} />
                
                {
                    // scroll is just a div styled with scroll-y component
                    // inside the div it renders Cardlist
                }
                  <ErrorBoundry>
                    <CardList robots={filteredRobots} />
                  </ErrorBoundry>
            </div>
        )
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(App)