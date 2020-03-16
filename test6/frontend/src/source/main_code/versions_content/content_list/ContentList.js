/*
    취약점 버전별로 나오는 부분 리스트 하나하나
*/

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './ContentList.scss';
const ContentList = ({date, summary, score, title, name}) => {
    const [rank, setRank] = useState([]);
    const [newScore, setNewScore] = useState(score);
    const handleScore = () => {

    }

    const handleSummary = () => {

    }

    const handleDate = () => {

    }

    const handleTitle = () => {

    }

    useEffect(() => {
        handleScore();
        handleSummary();
        handleDate();
    }, [])

    const scoreColor = () => {
        
    }

    return ( 
        <div className='contents'>
            <div className='contentTitle'>
                <Link to={`/source/${name}/${title}`}>
                    <div>{title}</div>
                </Link>
            </div>
            <div className='contentSummary'>
                <div>{summary}</div>
            </div>
            <div className='contentScore'>
                <div>{score}</div>
            </div>
        </div>
    )
}

export default ContentList;