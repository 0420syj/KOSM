/*
    즐겨찾기, 취약점을 버전별로 보여주는 페이지
*/

import React, {useState, useEffect, useCallback} from 'react';
import { Crawl, getFavProject } from '../../util/APIUtils';
import {MdStar, MdStarBorder, MdFullscreenExit} from 'react-icons/md'
import {IconContext} from 'react-icons';
import {addFavProject, deleteFavProject} from '../../util/APIUtils';
import OpenSourceData from '../../data/OpenSourceData';
import AfterMainSource from './versions_after_login_title/AfterMainSource';
import BeforeMainSource from './versions__before_login_title/BeforeMainSource';
import MainContent from './versions_content/MainContent';

import './MainSource.scss';
const MainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState('');
    const [idKey, setIdKey] = useState(0);
    const [listname, setListName]=useState([]);
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        isFavorite === true ? addFavorite() : deleteFavorite();
    }, [isFavorite])

    useEffect(() => {        
        setIsFavorite(false);
        getFavProject(sessionStorage.getItem('userId'))
        .then(res => {
            res.map((items) => {
                if(items.name === props.name){
                    setIsFavorite(true);
                }
            })
        })
        .catch(e => {
            console.log(e);
        })

        setData([]);
        var url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query="+props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
        const signupRequest = {url:url}
        Crawl(signupRequest)
        .then(res => {
            setIsReady(true);
            setData(res);
          // title은 목록 date날짜 summary 내용 score점수임. 
            },(error) => {
                alert("fail");
                console.log(error);
        });

        OpenSourceData.map((res) => {
            if(res.value === props.name) {
                setIdKey(res.id);
                return ;
            }
        })
    }, [props.name]);

    const favoriteClick = useCallback(() => {
        isFavorite === false ? alert('즐겨찾기가 추가 되었습니다') : alert('즐겨찾기를 삭제하였습니다.');
        setIsFavorite(!isFavorite);
    });

    const addFavorite = useCallback(() => {
        const obj = {
            project_id: idKey,
            user_id: sessionStorage.getItem('userId')
        }
        addFavProject(obj)
    });

    const deleteFavorite = useCallback(() => {
        if(idKey == 0)
            return ;
        const obj = [];
        obj[0] = {
            id: 0,
            name: sessionStorage.getItem('email')
        }
        obj.push({
            id: idKey,
            name: props.name
        })
        deleteFavProject(obj)
        .catch(e => {
            console.log(e);
        })
    });

    return ( 
        <div>
            <div>
                <div>
                    {
                        sessionStorage.getItem('isLogin') === 'true' ?
                        <After isFavorite={isFavorite} favoriteClcik={favoriteClick} name={props.name}/>:
                        <div className='before'>
                            {props.name}
                        </div>
                    }
                </div>
                {
                    data.length === 0 ?    //데이터가 없다면
                    <div style={{width: '100%', justifyContent:'center'}}> 
                        <div style={{marginTop: '80px'}}class="text-center">
                            <div style={{color: '#e4e4e4'}} class="spinner-border" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> :
                    <div>
                       {
                            sessionStorage.getItem('isLogin') === 'false' ?
                            <BeforeMainSource
                                name={props.name}
                                title={data[0].title}
                                date={data[0].date}/>:
                            <AfterMainSource
                                isFavorite = {isFavorite}
                                favoriteClick = {favoriteClick}
                                name={props.name}
                                title={data[0].title}
                                date={data[0].date}/>
                        }
                        <div className='vul'>
                            Vulnerability
                        </div>
                        <div>
                            <MainContent data={data} name={props.name}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const After = ({isFavorite, favoriteClick, name}) => {
    return (
        <div className='after'>
            <div className='star'>
                {
                    isFavorite === true ?
                    <IconContext.Provider
                        value={{color: 'yellow', size: '30px'}}>
                        <MdStar onClick = {favoriteClick}/> 
                    </IconContext.Provider> :
                    <MdStarBorder size='30px' onClick = {favoriteClick}/>
                }
            </div>
            <div className='name'>
                {name}
            </div>
        </div>
    )
}

export default MainSource;