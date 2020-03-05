import React, {useState, useEffect} from 'react';
import './AfterMainSource.scss';
import { Crawl, getFavProject } from '../util/APIUtils';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import {addFavProject, deleteFavProject} from '../util/APIUtils';
import OpenSourceData from '../data/OpenSourceData';

const AfterMainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [message, setMessage] = useState('');
    const [idKey, setIdKey] = useState(0);
    const [listname, setListName]=useState([]);

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
            if(res.value === props.name){
                setIdKey(res.id);
                return ;
            }
        })
    }, [props.name]);


    const onSubmit = (e) => {
        var url="https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword="+props.name; //이거는 keyword에 오픈소스이름넣어서 보내는거
        const signupRequest = {
            url:url
        }
        e.preventDefault();
        Crawl(signupRequest)
        .then(res => {
           var namelist;
           var list = res.split("?"); //이때 0,2,4,6...짝수는 타이틀이고 1,3,5,7...홀수는 디스크립션임
           alert(props.name);  
          //  alert(str); 
            setMessage(list);       
            namelist= list.map(  //이거는 그 dom에출력할려고 흐음..여튼저장한거임ㅇㅋ?
                (name) => ( <hi>{name}</hi>
                     ) 
            ); 
            setListName(namelist)//이것도 setlist한거고 맨마지막에쓰임
            },(error) => {
                alert("fail");
                console.log(error);
            });
    }

    return ( 
         <div className="source-container">
            <div style={{display: 'flex'}}>
                {
                    sessionStorage.getItem('isLogin') === 'true' ?
                    <div>
                        {
                            isFavorite === true ?
                            <IconContext.Provider
                                value={{color: 'yellow', size: '30px'}}>
                                <MdStar onClick = {favoriteClick}/> 
                            </IconContext.Provider> :
                            <MdStarBorder size='30px' onClick = {favoriteClick}/>
                        }
                    </div>:
                    null
                }
                <h2>{props.name}</h2>
                {listname}
                <button 
                        className='btn btn-success'
                        onClick={onSubmit}>
                        hi~~
                </button>:
            </div>
            
        </div>

    )
}

export default AfterMainSource;