import React from 'react';
import './DetailContents.scss';
const DetailContents = ({location}) => {
    return ( 
        <div className='detailContents'>
            {location}
        </div>
    )
}

export default DetailContents;