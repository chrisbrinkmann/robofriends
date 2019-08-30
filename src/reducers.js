import {
  CHANGE_SEARCH_FIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from './constants.js'

// initial state is where all of the apps states are stored
// this is the "Store"?
const initialStateSearch = {
  searchField: ''
}

const initialStateRobots = {
  robots: [],
  isPending: false,
  error: ''
}

// this is the reducer
// inputs are state and action
// output is new state
export const searchRobots = (state=initialStateSearch, action={}) => {
	// switches are a good way to structure reduces since
	// we can easily add more actions
	switch(action.type) {
		case CHANGE_SEARCH_FIELD:
			// cleaner spread syntax -
			return {...state, searchField:action.payload }

			// The Object.assign() method is used to copy the values of all
			//enumerable own properties from one or more source objects
			//to a target object. It will return the target object.
			// const returnedTarget = Object.assign(target, source);
			// It only copies enumerable and own properties
			// It uses [[Get]] on the source and [[Set]] on the target
			// return Object.assign({}, state, {searchField:action.payload})
		default:
			return state
	}
}

export const requestRobots = (state = initialStateRobots, action = {}) => {
  switch (action.type) {
    case REQUEST_ROBOTS_PENDING:
      return {...state, isPending: true }
    case REQUEST_ROBOTS_SUCCESS:
      return {...state, robots:action.payload, isPending:false}
    case REQUEST_ROBOTS_FAILED:
      return {...state, error: action.payload, isPending: false}
    default:
      return state
  }
}