/*
    로그인 후 왼쪽 리스트 버튼을 눌렀을 때 나오는 제목 부분
*/
import React, {useState, useEffect} from 'react';
import './AfterMainSource.scss';
const AfterMainSource = ({release, releaseDate, github, date, graph}) => {
    const [newDate, setNewDate] = useState([]);
    
    useEffect(() => {
        setNewDate(date.split(';'))
    }, [date])

    return ( 
        <div className='afterMainSource'>
            <div className='div'>
                <span className='topPage'>
                </span>
            </div>
            <div className='topPage' style={{paddingBottom: '20px', minWidth: '900px'}}>
                <span className='text'>
                    <span>
                        <span className='title'>
                            CVE Last modified: &nbsp;
                        </span>
                        <span>      
                            {newDate[0]}     
                        </span>
                    </span>
                </span>
                {
                    releaseDate !== null &&
                    <span className='text' style={{width: '260px'}}>
                        <span className='title'>
                            latest version date: &nbsp;
                        </span>
                        <span>
                            {releaseDate}
                        </span>
                    </span>
                }
                {
                    release !== null &&
                    <span className='text' style={{width: '400px'}}>
                        <span className='title'>
                            Latest version: &nbsp;
                        </span>
                        <span>
                            {release}
                        </span>
                    </span>
                }
            </div>
        </div>
    )
}

export default AfterMainSource;