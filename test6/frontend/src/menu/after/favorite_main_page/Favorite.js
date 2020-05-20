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
        .catch(() => {})
    }, [favItems.length]);

    return (
        <div>
            {
                ready === false ?
                <div style={{marginLeft: '100px', marginTop: '100px', color: '#FFFFFF', fontSize: '50px'}}>Loading....</div> :
                <MainFavorite favItems={favItems} setFavItems={setFavItems}/>
            }
        </div>
    )
}

export default Favorite;