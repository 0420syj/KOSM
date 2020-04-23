/*
    버전별 세부사항 주 내용
*/
import React, { useEffect, useState} from 'react';
import './DetailContents.scss';
const DetailContents = ({infos, link, title, scores}) => {
    const [linkArray, setLink] = useState([]);
    let idx = 0;
    useEffect(() => {
        setLink(link.split(','));
    }, [link])

    let arr = scores.split(',');
    let scoreV3, scoreV2;
    if(arr.length === 2){
        scoreV3 = arr[1]
        scoreV2 = arr[0]
    }
        
    else{
        scoreV3 = arr[0]
        scoreV2 = arr[1]
    }
        
    // console.log(arr)

    const colorRender = data => {
        let flag
        if(data === '' || arr.length === 1) flag = data
        else flag = data.substring(0,2)
        switch (flag) {
            case '0.':
                return <span style={{ marginLeft: '25px', height: '30px', background: 'darkgrey', color: 'black', fontWeight: 'bold' }}>&nbsp;N/A&nbsp;<br /><br /></span>
            case '1.':
            case '2.':
            case '3.':
            case '4.':
                return <span style={{ marginLeft: '25px', height: '30px', background: '#F2CC0C', color: 'black', fontWeight: 'bold' }}>&nbsp;{data}&nbsp;<br /><br /></span>
            case '5.':
            case '6.':
                return <span style={{ marginLeft: '25px', height: '30px', background: '#EC971F', color: 'black', fontWeight: 'bold' }}>&nbsp;{data}&nbsp;<br /><br /></span>
            case '7.':
            case '8.':
                return <span style={{ marginLeft: '25px', height: '30px', background: '#d9534f', color: 'black', fontWeight: 'bold' }}>&nbsp;{data}&nbsp;<br /><br /></span>
            case '9.':
                return <span style={{ marginLeft: '25px', height: '30px', background: '#000000', color: '#a9a9a9', fontWeight: 'bold' }}>&nbsp;{data}&nbsp;<br /><br /></span>
            case '10':
                return <span style={{ marginLeft: '25px', height: '30px', background: '#000000', color: '#a9a9a9', fontWeight: 'bold' }}>&nbsp;{data}&nbsp;<br /><br /></span>
            default:
                return <span style={{ marginLeft: '25px', height: '30px', background: 'darkgrey', color: 'black', fontWeight: 'bold' }}>&nbsp;N/A&nbsp;<br /><br /></span>
        }
    }

    return ( 
        <div className='detailContents'>
            <div style={{marginTop: '30px'}}></div>
            <div className='scores'>
            <span style={{display: 'inline-block', width: '35px'}}>V3:</span>{colorRender(scoreV3)}
            <span style={{display: 'inline-block', width: '35px'}}>V2.1:</span>{colorRender(scoreV2)}
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