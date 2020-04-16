import React from 'react';
import {MdStar, MdStarBorder} from 'react-icons/md'
import './FavoriteList.scss';
import {IconContext} from 'react-icons';
import {Link} from 'react-router-dom';

const FavoriteList = ({name, type, idx, favItem, setFavItem}) => {
    const onClick = () => {
        const temp = [].concat(favItem);
        temp[idx] = !temp[idx];
        setFavItem(temp);
    }

    return ( 
        <div className='favListContainers'>
            <div className='favList'>
                <span className='star'>
                    {
                        type === true ?
                        <IconContext.Provider
                            value={{color: 'yellow', size: '30px'}}>
                            <MdStar onClick = {onClick}/> 
                        </IconContext.Provider> :
                        <MdStarBorder size='30px' onClick = {onClick}/>
                    }
                </span>
                <span className='name'>
                    <Link 
                        to={`/source/${name}`}
                        className='link'>
                        {name}
                    </Link>
                </span>
                <span className='patchDate'>
                    2020.03.05
                </span>
                <span className='vulDate'>
                    2020.03.05
                </span>
            </div>
            <div style={{width: '1200px', marginLeft: '100px', marginTop: '14.5px'}}>
                <hr style={{border: '0.5px solid #e4e4e4'}}/>
            </div>
        </div>
    )
}

export default FavoriteList;