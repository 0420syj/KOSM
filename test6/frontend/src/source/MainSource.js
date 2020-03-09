import React, {useState, useEffect} from 'react';
import { Crawl, getFavProject } from '../util/APIUtils';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import {addFavProject, deleteFavProject} from '../util/APIUtils';
import OpenSourceData from '../data/OpenSourceData';
import AfterMainSource from './AfterMainSource';
import BeforeMainSource from './BeforeMainSource';
import MainContent from './MainContent';
import './MainSource.scss';
const MainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState('');
    const [idKey, setIdKey] = useState(0);
    const [listname, setListName]=useState([]);
    const [isReady, setIsReady] = useState(false);
    const [data, setData] = useState([]);
    useEffect(() => {
        if(isFavorite === true){
            addFavorite();      //즐겨찾기 추가 버튼을 눌렀을 때 실행
        }
        else {
            deleteFavorite();       //즐겨찾기 해제 버튼을 눌렀을 때 실행
        }
    }, [isFavorite])

    const favoriteClick = () => {
        if(isFavorite === false){
            alert('즐겨찾기가 추가 되었습니다');
        }
        else{
            alert('즐겨찾기를 삭제하였습니다.');
        }
        setIsFavorite(!isFavorite);
    }

    const addFavorite = () => {
        const obj = {
            project_id: idKey,
            user_id: sessionStorage.getItem('userId')
        }
        addFavProject(obj)
    }

    const deleteFavorite = () => {
        if(idKey == 0)
            return ;
        const obj = {
            project_id: idKey,
            user_id: sessionStorage.getItem('userId')
        }
        deleteFavProject(obj)
        .then(() => {
            console.log('erased');
        })
        .catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {        
        setIsFavorite(false);
        getFavProject(sessionStorage.getItem('userId'))
        .then(res => {
            res.map((items) => {
                if(items.name === props.name){
                    console.log('here');
                    setIsFavorite(true);
                }
            })
        })
        .catch(e => {
            console.log(e);
        })

        OpenSourceData.map((res) => {
            if(res.value === props.name) {
                setIdKey(res.id);
                return ;
            }
        })
    }, [props.name]);


    useEffect(() => {
        setData([]);
        var url="https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query="+props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
        const signupRequest = {
            url:url
        }
        Crawl(signupRequest)
        .then(res => {
            setIsReady(true);
            setData(res);
          // title은 목록 date날짜 summary 내용 score점수임. 
            },(error) => {
                alert("fail");
                console.log(error);
            });
    }, [props.name]);

    return ( 
        <div>
            <div>
                {
                    data.length === 0 ?    //데이터가 없다면 
                    <div>Loading...</div>:
                    <div>
                       {
                            sessionStorage.getItem('isLogin') === 'false' ?
                            <BeforeMainSource
                                name={props.name}
                                title={data[0].title}
                                date={data[0].date}/>:
                            <AfterMainSource
                                isFavorite = {isFavorite}
                                favoriteClick = {favoriteClick}/>
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

export default MainSource;