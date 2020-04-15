/*
    버전별 세부사항 주 내용
*/
import React, {memo, useEffect, useState} from 'react';
import {Link, Route} from 'react-router-dom';
import './DetailContents.scss';
const DetailContents = ({infos, link, title, scores}) => {
    const [linkArray, setLink] = useState([]);
    let idx = 0;
    useEffect(() => {setLink(link.split(','));}, [])

    return ( 
        <div className='detailContents'>
            <div style={{marginTop: '30px'}}></div>
            <div className='scores'>
                {scores}
            </div>
            <div className='title'>
                Description
                <div className='content'>{title}</div>
                <hr className='hr'/>
            </div>
            <div className='title'>
                Modified
                <div className='content'>{infos}</div>
                <hr className='hr'/>
            </div>
            <div className='title'>
                Reference
                <div className='content'>
                {
                    linkArray.length !== 0 && 
                    <div style={{overflow: 'hidden'}}>
                        {
                            linkArray.map(item => 
                                <a 
                                    key={idx++} 
                                    target='_blank' 
                                    href={`${item}`}>
                                    <div>{item}</div>
                                </a>
                            )
                        }
                    </div>
                }
                </div>
            </div>
        </div>
    )
};

export default DetailContents;