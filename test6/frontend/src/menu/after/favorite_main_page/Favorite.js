import React, {useState, useEffect} from 'react';
import {getFavProject} from '../../../util/APIUtils';
import MainFavorite from './MainFavorite';

const Favorite = () => {
    const [favItems, setFavItems] = useState([]);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        getFavProject(sessionStorage.getItem('userId'))
        .then((res) => {
            setFavItems(res);
            setTimeout(() => {setReady(true)}, 0);
        })
        .catch(e => {console.log(e)})
    }, [favItems.length]);

    return (
        // 이쪽도 SCSS 추가해야 함
        // 오픈소스 클릭했다가 메인 화면으로 들어왔을 때 화면 겹치는 문제 해결을 위해 MainFavorite.js파일 생성함
        <div>
            {
                ready === false ?
                <div style={{marginLeft: '100px', marginTop: '100px', color: '#FFFFFF', fontSize: '50px'}}>Loading....</div> :
                <MainFavorite favItems={favItems} setFavItems={setFavItems}/>
            }
        </div>
    )
}

//최신 업데이트 날짜, 최신 취약점 날짜, 
export default Favorite;