import React from 'react';
import './Description.scss';

const Description = () => {
    return ( 
        <div className="content-container">
            <div className="titles">
                <div>Manage Opensource</div>
                <div>for developers</div>
            </div>
            <div className="description">
                <div><span className='bold-font'>KOSM</span> sends you an email about</div>
                <div>the changed vulnerability in open source.</div>
                <div>It also helps to recognize the version</div>
                <div>of the latest vulnerability</div>
            </div>
        </div>
    )
}

export default Description;
