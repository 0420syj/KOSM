/*
    버전별 세부사항 메인 페이지
*/
import React, {useEffect, useState} from 'react';
import SourceList from '../../menu/SourceList';
import DetailTitle from './DetailTitle';
import DetailContents from './DetailContents';
import './DetailMain.scss';
import {detailCrawl} from '../../util/APIUtils';
const DetailMain = ({match}) => {
    const url = "https://nvd.nist.gov/vuln/detail/" + match.params.source;
    const [data, setData] = useState([]);
    console.log(match.params.source);
    useEffect(() => {
        const signupRequest = {url:url}
        detailCrawl(signupRequest)      
            .then(res => {
                setData(res);
                console.log(res);       //여기서 데이터 불러 옴
            })
            .catch(e => console.log(e));
    }, []);

    return ( 
        <div>
            <DetailTitle/>
            <div className='detailMainContainer'>
                <SourceList/>
                <DetailContents
                    location={match.params.source}/>
            </div>            
        </div>
    )
}

export default DetailMain;