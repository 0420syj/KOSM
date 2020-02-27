import React, {useState, useEffect} from 'react';
import { Crawl, getFavProject } from '../util/APIUtils';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import axios from 'axios';
import {addFavProject, deleteFavProject} from '../util/APIUtils';
import OpenSourceData from '../data/OpenSourceData';

const MainSource = (props) => {
    const [message, setMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
    const [idKey, setIdKey] = useState(0);
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
            user_id: localStorage.getItem('userId')
        }
        addFavProject(obj)
    }

    const deleteFavorite = () => {
        if(idKey == 0)
            return ;
        const obj = {
            project_id: idKey,
            user_id: localStorage.getItem('userId')
        }
        // console.log('obj');
        // console.log(obj);
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
        getFavProject(localStorage.getItem('userId'))
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


    useEffect(() => {
        if(isFavorite === true){
            addFavorite();      //즐겨찾기 추가 버튼을 눌렀을 때 실행
        }
        else {
            deleteFavorite();       //즐겨찾기 해제 버튼을 눌렀을 때 실행
        }
    }, [isFavorite])

    const handleSubmit = (e) => {
        // console.log("handleSubmit: " + success);
        e.preventDefault();
        const signupRequest = {
            url:"https://www.w3schools.com"
        }
        axios.post('http://localhost:5000/api/webcrawler/main', signupRequest)        
        .then(res => {
            console.log('res');
         //   console.log(res.message());
        },(error) => {
            alert("fail");
            console.log(error);
        });
    }

    const onSubmit = (e) => {
        const signupRequest = {
            url:"https://www.w3schools.com"
        }
        e.preventDefault();
        Crawl(signupRequest)
        .then(res => {
                alert("Success"); 
                setMessage(res.message);
            },(error) => {
                alert("fail");
                console.log(error);
            });
    }

    return ( 
        <div>
            <div style={{display: 'flex'}}>
                {
                    localStorage.getItem('isLogin') === 'true' ?
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
                {message}
                <button 
                        className='btn btn-success'
                        onClick={onSubmit}>
                        hi~~
                </button>:
            </div>
            
        </div>
    )
}

export default MainSource;