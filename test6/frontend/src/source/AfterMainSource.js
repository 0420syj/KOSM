import React from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';

const AfterMainSource = ({isFavorite, favoriteClick}) => {
    return ( 
        <div>
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
                {/* <h2>{props.name}</h2>
                {listname} */}

        </div>
    )
}

export default AfterMainSource;