import React, {useState, useEffect} from 'react';
import {getFavProject} from '../../util/APIUtils';
const Favorite = () => {
    const [favItems, setFavItems] = useState([]);
    useEffect(() => {
        getFavProject(localStorage.getItem('userId'))
        .then((res) => {
            setFavItems(res);
        })
        .catch(e => {
            console.log(e);
        })
    }, [favItems.length]);

    return ( 
        <div>
            {
                favItems.length != 0 ?
                favItems.map((items) => {
                    return <div key={items.id} style={{color: '#FFFFFF'}}>{items.name}</div>
                }) :
                <div></div>
            }
        </div>
    )
}
//최신 업데이트 날짜, 최신 취약점 날짜, 
export default Favorite;