/*
    버전별 세부사항 주 내용
*/
import React, { useEffect, useState} from 'react';
import './DetailContents.scss';
const DetailContents = ({infos, link, title, scores}) => {
    const [linkArray, setLink] = useState([]);
    let idx = 0;
    useEffect(() => {setLink(link.split(','));}, [link])

    return ( 
        <div className='detailContents'>
            <div style={{marginTop: '30px'}}></div>
            <div className='scores'>
                {scores}
            </div>
            <div className='date'>
                <span className='lastModified'>
                    NVD Published Date: this is empty now   NVD Last Modified: {infos}
                </span>
            </div>
            <div className='title'>
                Description
                <div className='content'>{title}</div>
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
                                    rel="noopener noreferrer"
                                    href={`${item}`}>
                                    <div className='preference'>{item}</div>
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