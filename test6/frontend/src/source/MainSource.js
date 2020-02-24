import React, {useState, useEffect} from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
const MainSource = (props) => {
    const [isFavorite, setIsFavorite] = useState(false);
    // async function asyncOrder() {
    //     return await Promise.resolve(
    //         setIsFavorite(!isFavorite),
    //         console.log(isFavorite)
    //     )
    // }
    // async function favoriteClick() {
    //     asyncOrder()
    //     .then(() => {
    //         console.log('success');
    //         console.log(isFavorite);
    //     }
    //     )
    //     .catch(e => {
    //         console.log(e);
    //     })
    // }

    const favoriteClick = () => {
        setIsFavorite(!isFavorite);
    }
    useEffect(() => {
        if(isFavorite === true)
            alert('즐겨찾기가 추가되었습니다.');
    }, [isFavorite])

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
            </div>
            
        </div>
    )
}

export default MainSource;