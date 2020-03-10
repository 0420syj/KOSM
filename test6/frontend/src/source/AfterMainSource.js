import React from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import {IconContext} from 'react-icons';
import './AfterMainSource.scss';
const AfterMainSource = ({isFavorite, favoriteClick, name, title, date}) => {
    return ( 
            <div className='beforeMainSource'>
                <div className='topStar'>
                    <div className='star'>
                        {
                            isFavorite === true ?
                            <IconContext.Provider
                                value={{color: 'yellow', size: '30px'}}>
                                <MdStar onClick = {favoriteClick}/> 
                            </IconContext.Provider> :
                            <MdStarBorder size='30px' onClick = {favoriteClick}/>
                        }
                    </div>
                    <div className='topName'>
                        {name}
                    </div>
                </div>
                <span className='topLicense'>
                    {title}
                </span>
                <span className='topPage'>
                    www.page.com
                </span>
                <span className='topDate'>
                    {date}
                </span>
        </div>
    )
}

export default AfterMainSource;