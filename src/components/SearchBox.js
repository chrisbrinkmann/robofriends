import React from 'react';

// destructuring allows us to grab the props object and get its properties
// what exactly are we destructuring here? is searchChange an object?
// the thing that we passed from App as the prop was a method that set the state
const SearchBox = ({ searchChange }) => {
    return (
        <div className='pa2'>
            <input
                className=''
                type="search"
                placeholder="search robots"
                onChange={searchChange}
                // onChange is a regular HTML attribute; fires when value of input changes
                // {searchChange} is a JS expression (state/prop) passed from App component
            />
        </div>
    );
}

export default SearchBox;