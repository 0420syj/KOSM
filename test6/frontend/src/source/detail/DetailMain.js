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
    const nvdIcon = 'https://applets.imgix.net/https%3A%2F%2Fassets.ifttt.com%2Fimages%2Fchannels%2F393895903%2Ficons%2Fmonochrome_large.png%3Fversion%3D0?w=240&h=240&auto=compress&s=f1dab2b3ab2b9e6d4cf69ddd3ac73699';
    const nvdLink = `https://nvd.nist.gov/vuln/detail/${match.params.source}`;
    const [data, setData] = useState([]);
    let history = useHistory();
    const [publish, setPublish] = useState('');
    const [modify, setModify] = useState('');

    useEffect(() => {
        detailCrawl({url: nvdLink})      
            .then(res => {
                const spl = res[0].infos.split(',');
                setPublish(spl[0]);
                setModify(spl[1]);
                setData(res);
            })
            .catch(e => console.log(e));
    }, [nvdLink]);

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
                            history.push({pathname: '../' + arr[2]});
                        }}>
                        <MdDehaze/> 목록
                    </Button><br/>
                    <span>{match.params.source}</span>    
                    <a 
                        target='_blank'
                        rel="noopener noreferrer"
                        href={nvdLink}>
                        <img 
                            className='nvdLink'
                            alt=''
                            src={nvdIcon}/>
                    </a>
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
                        publishDate={publish}
                        modifyDate={modify}
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