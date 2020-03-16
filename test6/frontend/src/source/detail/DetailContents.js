/*
    버전별 세부사항 주 내용
*/
import React from 'react';
import './DetailContents.scss';
const DetailContents = ({location}) => {
    return ( 
        <div className='detailContents'>
            <div className='detailTitle'>
                {location}
            </div>
            <div className='detailDescription'>
                Description
            </div>
            <hr className='hr'/>
            <div>

            </div>
            <div className='detailVulnerability'>
                Vulnerability type
            </div>
            <hr className='hr'/>
            <div className='detailReference'>
                Reference
            </div>
            <hr className='hr'/>
        </div>
    )
}

export default DetailContents;