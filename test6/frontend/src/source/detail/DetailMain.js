/*
    버전별 세부사항 메인 페이지
*/
import React, {useEffect, useState} from 'react';
import SourceList from '../../menu/SourceList';
import DetailTitle from './DetailTitle';
import DetailContents from './DetailContents';
import Footer from '../../menu/Footer'
import './DetailMain.scss';
import {detailCrawl} from '../../util/APIUtils';
const DetailMain = ({match}) => {
    const url = "https://nvd.nist.gov/vuln/detail/" + match.params.source;
    const [data, setData] = useState([]);
    console.log(url);

    useEffect(() => {
        detailCrawl({url: url})      
            .then(res => {
                setData(res);
                console.log(res);       //여기서 데이터 불러 옴
            })
            .catch(e => console.log(e));
    }, []);

    return ( 
        <div className="container">
            <div className="top">
                <DetailTitle/>
            </div>
            <div className="left">
                <SourceList />
            </div>
            <div className="detail-main-content">
                <div className='detail-title-content'>
                    {match.params.source}
                </div>
                {
                    data.length === 0 ? 
                    <div 
                        style={{marginTop: '80px', width: '100%'}}
                        className="text-center">
                        <span 
                            style={{color: '#e4e4e4', marginTop: '200px'}} 
                            className="spinner-border" 
                            role="status">
                        </span>
                    </div> :
                    <DetailContents
                        infos={data[0].infos}
                        link={data[0].links}
                        title={data[0].title}/>
                }
            </div>
            <div className="bottom">
                <Footer/>
            </div>
        </div>
    )
}

export default DetailMain;