import React from 'react';
import './Description.scss';

const Description = () => {
    return ( 
        <div className="content-container">
            <div className="titles">
                <div>Built for</div>
                <div>developers</div>
            </div>
            <div className="description">
                <div>KOSM is a development platform inspried by the way</div>
                <div>you work. From <span className="bold-font">open source</span> to <span className="bold-font">business</span>, you</div>
                <div>can host and review code, manageprojects, and</div>
                <div>build software alongside 40 million developers.</div>
            </div>
        </div>
    )
}

export default Description;
