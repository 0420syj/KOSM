/*
    로그인 후 왼쪽 리스트 버튼을 눌렀을 때 나오는 제목 부분
*/
import React, {useState, useEffect} from 'react';
import './AfterMainSource.scss';
const AfterMainSource = ({title, github, date, graph}) => {
    const [newDate, setNewDate] = useState([]);
    console.log(github);
    useEffect(() => {
        setNewDate(date.split(';'))
    }, [])
    return ( 
        <div className='beforeMainSource'>
            <span className='topLicense'>
                {title}
            </span>
            <span className='topPage'>
                {
                    github !== null &&
                    <a
                        className='link' 
                        href={github}>
                        Github
                    </a>
                }
                {
                    graph !== null&&
                    <a
                        className='link'
                        href={graph}>
                        graph
                    </a>
                }
            </span>
            <span className='topDate'>
                {newDate[0]}
            </span>
        </div>
    )
}

export default AfterMainSource;