import React from 'react';
import Card from './Card';

//render the CardList, passing the destructured prop "robots"
const CardList = ({ robots }) => {
    
    return (
        <div>
            {
                // render a Card Component for each robot in the array from robot.js
                robots.map(robot => {
                    return (
                        <Card // the card props are pulled from the robot prop which was passed to CardList
                            key={robot.id}
                            id={robot.id}
                            name={robot.name}
                            email={robot.email}
                        />
                    );
                })
            }
        </div>
    )
}

export default CardList;