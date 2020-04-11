/*
    즐겨찾기, 취약점을 버전별로 보여주는 페이지
*/

import React, {useState, useEffect, useCallback} from 'react';
import { Crawl, getFavProject } from '../../util/APIUtils';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import {addFavProject, deleteFavProject} from '../../util/APIUtils';
import OpenSourceData from '../../data/OpenSourceData';
import AfterMainSource from './versions_after_login_title/AfterMainSource';
import MainContent from './versions_content/MainContent';
import './MainSource.scss';

const MainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [idKey, setIdKey] = useState(0);
    const [data, setData] = useState([]);
    useEffect(() => {
        isFavorite === true ? addFavorite() : deleteFavorite();
    }, [isFavorite])

    useEffect(() => {               //즐겨찾기 버튼에 색 추가
        if(sessionStorage.getItem('isLogin') === 'true'){   //로그인 된 상태라면
            setIsFavorite(false);
            getFavProject(sessionStorage.getItem('userId'))
            .then(res => {  //내가 즐겨찾기 한 목록과 이름이 일치하면 즐겨찾기 버튼 추가
                res.map((items) => {
                    items.name === props.name && setIsFavorite(true);
                })
            })
            .catch(e => {console.log(e)})
        }
    }, [props.name]);


    useEffect(() => {       //크롤링하는 부분
        setData([]);
        const url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=" + props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
        const signupRequest = {
            url:url,
            name: props.name 
        }

        Crawl(signupRequest)
            .then(res => {
                setData(res);
                OpenSourceData.map((res) => {       //내가 어떤 데이터를 추가할건지를 setIdKey함수를 통해서 설정
                    res.name === props.name && setIdKey(res.id);
                })    
            })
            .catch(e => alert('fail'));
    }, [props.name])

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
        if(idKey === 0) return ;
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
        .catch(e => console.log(e));
    });
    return ( 
            <div>
                <div>
                    <div>
                        <span>
                            {
                                sessionStorage.getItem('isLogin') === 'true' && data.length !== 0 ?
                                <span>
                                    <After 
                                        isFavorite={isFavorite} 
                                        favoriteClick={favoriteClick} 
                                        graph={data[0].graph}
                                        github={data[0].Link}
                                        name={props.name}/> 
                                </span>:
                                <div className='before'>
                                    {props.name}   
                                    <span>
                                        {
                                            data.length !== 0 && 
                                            <Link graph={data[0].graph} github={data[0].Link}/>
                                        }
                                    </span>
                                </div>
                            }
                        </span>
                    </div>
                </div>
                {
                    data.length === 0 ?    //데이터가 없다면
                    <div style={{width: '100%', justifyContent:'center'}}> 
                        <div style={{marginTop: '80px'}}className="text-center">
                            <div style={{color: '#e4e4e4'}} className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <div className='minititle'>
                            <AfterMainSource
                                github={data[0].Link}   //github 사이트
                                graph={data[0].graph}   //graph url
                                release={data[0].Release}   //깃허브의 release 버전
                                releaseDate={data[0].ReleaseDate}   //깃허브 release된 날짜
                                date={data[0].date}     //취약점 시간
                            />   
                        </div>
                        <div className='vul'>
                            Vulnerability <span>검색결과 : {data.length}건</span>
                        </div>
                        <div className="vul-content">
                            <MainContent data={data} name={props.name}/>
                        </div>
                    </div>
                }
            </div>
    )
}

const After = ({isFavorite, favoriteClick, name, github, graph}) => {
    return (
        <span className='after'>
            <span className='star'>
                <IconContext.Provider 
                    value={{color: '#f2cc0c', size: '40px'}}>
                    {
                        isFavorite === true 
                        ? <MdStar onClick = {favoriteClick}/> 
                        : <MdStarBorder onClick = {favoriteClick}/>
                    }
                </IconContext.Provider>
            </span>
            <span className='name'>
                {name}
            </span>
            <span className='link'>
                <Link graph={graph} github={github}/>                                    
            </span>
        </span>
    )
}


const Link = ({graph, github}) => {
    return (
        <span className='linkContainer'>
            <span className='graph'>
                {
                    graph !== null &&
                    <span>
                        <a      //그래프 사이트로 가는 링크
                            href={graph} target="_blank">
                            <img src="/icons/graph.png" alt="Graph" width="25px" height="25px"/>
                        </a>
                    </span>
                }
            </span>
            <span className='github'>
                {
                    github !== null &&                 
                    <span>
                        <a      //깃허브 사이트로 가는 링크
                            href={github} target="_blank">
                            <img src="/icons/github.png" alt="GitHub" width="25px" height="25px"/>
                        </a>
                    </span>
                }
            </span>
        </span>
    )
}
export default MainSource;