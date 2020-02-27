import React, {useState, useEffect} from 'react';
import { Crawl } from '../util/APIUtils';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import axios from 'axios';
const MainSource = (props) => {
    const [message, setMessage] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const favoriteClick = () => {
        setIsFavorite(!isFavorite);
    }
    useEffect(() => {
        if(isFavorite === true)
            alert('즐겨찾기가 추가되었습니다.');
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
                                value={{color: 'yellow'}}>
                                <MdStar onClick = {favoriteClick}/> 
                            </IconContext.Provider> :
                            <MdStarBorder onClick = {favoriteClick}/>
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