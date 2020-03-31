/*
    로그인 후 왼쪽 리스트 버튼을 눌렀을 때 나오는 제목 부분
*/
import React, {useState, useEffect} from 'react';
import './AfterMainSource.scss';
const AfterMainSource = ({release, releaseDate, github, date, graph}) => {
    const [newDate, setNewDate] = useState([]);
    console.log(github);
    useEffect(() => {
        setNewDate(date.split(';'))
    }, [])
    return ( 
        <div className='afterMainSource'>
            <div className='div'>
                <span className='topPage'>
                    {
                        graph !== null&&
                        <span className='link'>
                            <a      //그래프 사이트로 가는 링크
                                className='link-text' 
                                href={graph}>
                                link to Vulnerability statistics
                            </a>
                        </span>
                    }
                    {
                        github !== null &&
                        <span className='link'>
                            <a      //깃허브 사이트로 가는 링크
                                className='link-text'
                                href={github}>
                                link to Github site
                            </a>
                        </span>
                    }
                </span>
            </div>
            <div className='topPage' style={{paddingBottom: '20px'}}>
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