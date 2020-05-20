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
                <div><span className='bold-font'>KOSM</span> sends you an email about the changed vulnerability</div>
                <div>취약점을 인지하고 사용할 수 있도록 도와줍니다.</div>
            </div>
        </div>
    )
}

export default Description;
