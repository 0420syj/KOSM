/*
    버전별 세부사항 메인 페이지
*/
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import { MdDehaze } from "react-icons/md";
import SourceList from '../../menu/SourceList';
import DetailTitle from './DetailTitle';
import DetailContents from './DetailContents';
import Footer from '../../menu/Footer'
import './DetailMain.scss';
import {detailCrawl} from '../../util/APIUtils';
const DetailMain = ({match}) => {
    const url = "https://nvd.nist.gov/vuln/detail/" + match.params.source;
    const [data, setData] = useState([]);

    let history = useHistory();

    useEffect(() => {
        detailCrawl({url: url})      
            .then(res => {
                setData(res);
            })
            .catch(e => console.log(e));
    }, [url]);

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
                <Button
                                className="go-board-button"
                                onClick={() => {
                                    let arr = history.location.pathname.split('/')
                                    history.push({
                                        pathname: '../' + arr[2],
                                    });
                                }}
                                >
                                <MdDehaze/> 목록
                            </Button><br/>
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
                        title={data[0].title}
                        scores={data[0].scores}/>
                }
            </div>
            <div className="bottom">
                <Footer/>
            </div>
        </div>
    )
}

export default DetailMain;