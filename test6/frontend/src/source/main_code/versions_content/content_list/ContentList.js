/*
    취약점 버전별로 나오는 부분 리스트 하나하나
*/

import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import './ContentList.scss';


const Score = (props) => {
    let index = 0;
    const colorRender = useCallback((data) => {
        const v = data[0] + data[1];
        if(data != null){
            switch(v){
                case '0.':
                case '1.':
                case '2.':
                case '3.':
                case '4.':
                    return <span key={index++} style={{marginLeft: '25px', height: '30px', background: '#F2CC0C', color: 'black', fontWeight: 'bold'}}>{data}<br/><br/></span>
                case '5.':
                case '6.':
                    return <span key={index++} style={{marginLeft: '25px', height: '30px', background: '#EC971F', color: 'black', fontWeight: 'bold'}}>{data}<br/><br/></span>
                case '7.':
                case '8.':
                case '10':
                    return <span key={index++} style={{marginLeft: '25px', height: '30px', background: '#D9534F', color: 'black', fontWeight: 'bold'}}>{data}<br/><br/></span>
                case '9.': 
                    return <span key={index++} style={{marginLeft: '25px', height: '30px', background: '#000000', color: '#a9a9a9', fontWeight: 'bold'}}>{data}<br/><br/></span>
            }
        }
    })

    return (
        <div>
            {
                props.newScore.map(item => {
                    return (
                    item[0] === 'V' ? 
                    <span key={index++} style={{display: 'inline-block', width: '25px'}}>{item}</span>: 
                    colorRender(item)
                )})
            }
        </div>
    )
}

const ContentList = ({date, summary, score, title, name}) => {
    const [newScore, setNewScore] = useState([]);
    const [rank, setRank] = useState([]);

    const settingScore = useCallback(() => {
        const arr = score.split(' ');
        let str = '';
        for(let i = 0; i < arr.length; i++){
            if(i % 3 === 0)
                setNewScore(prev => [...prev, arr[i].trim()]);
            else if(i % 3 === 2){
                setNewScore(prev => [...prev, arr[i - 1] + ' ' + arr[i]]);
            }
        }
    });

    useEffect(() => {
        settingScore();
    }, []);

    return ( 
        <>
            <div className='contents'>
                <div className='contentTitle'>
                    <Link to={`/source/${name}/${title}`} 
                        className='title-link' >
                        <div>{title}</div>
                    </Link>
                </div>
                <div className='contentSummary'>
                    <div>{summary}</div>
                </div>
                <div className='contentScore'>
                    <Score newScore={newScore}/>
                </div>
            </div>
            <Hr/>
        </>
    )
}

const Hr = styled.hr`
    border: 0.5px solid white;
    // margin-left: 130px;
    // margin-right: 30px;
`
export default ContentList;