import React from 'react';
import './Country.css';

const Country = (props) => {
    return (
        <div className="country" id={props.id} onClick={(event) => props.clicked(event)}>
            {props.name}
        </div>
    )
};

export default Country;