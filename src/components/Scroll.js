import React from 'react';

const Scroll = props => {
    return(
    // in JSX we can add styles with double curly braces
    // meaning a JS expression containing an object, that holds css styles
    <div style={{ overflowY:'scroll', border: '5px solid black', height: '900px'}}>
        {props.children}
    </div>
    )
}

export default Scroll;