/*
    로그인하고 난 후의 첫 화면
*/
import React, {useState, useEffect, useRef, memo} from 'react';
import FavoriteList from './FavoriteList';
import './MainFavorite.scss';
import {deleteFavProject} from '../../../util/APIUtils';
import {getFavProject} from '../../../util/APIUtils';
import styled from 'styled-components'

const MainFavorite = ({favItems, setFavItems}) => {
    const [favItem, setFavItem] = useState([]); //true로만 구성
    const [page, setPage] = useState(1);        
    const [selected, setSelected] = useState(1);
    const [publish, setPublish] = useState('');
    const [modify, setModify] = useState('');
    const temp = useRef([]);
    let index = -1;

    const buttonClick = (e) => {
        let i = 0;
        
        temp.current.push({
            id: 0,
            name: sessionStorage.getItem('email')
        });

        favItem.map((item) => {
            item === false && temp.current.push(favItems[i])
            i++;
            return true;
        });

        deleteFavProject(temp.current)
            .then(() => {
                getFavProject(sessionStorage.getItem('userId'))
                    .then(res => {
                        setFavItems(res)
                        setPage(1);
                        setSelected(1);
                        temp.current=[];
                    })
            }).catch(e => {console.log(e)})
    }
    
    useEffect(() => {
        const obj = [];
        favItems.map(() => obj.push(true))
        setFavItem(obj);
        console.log(favItems)
    }, [favItems])
        
    return ( 
        <div className='favoriteContainer'>
            <div className='favTitle'>내 즐겨찾기</div>
            <div className='favTitle2'>
                <div className='favTitle3'>NVD Published Date</div>
                <div className='favTitle4'>NVD Last Modified</div>
            </div>
            <div className='favContents'>
                {
                    favItems.length !== 0 ?
                    <div>
                        {
                            favItems.map((items) => {
                                index++;
                                if(index >= (page - 1) * 5 && index < 5 * page) {
                                return (
                                    <div key={items.id} style={{color: '#FFFFFF'}}>
                                        <FavoriteList 
                                            publish={items.date2}
                                            modify={items.date}
                                            name={items.name} 
                                            type={favItem[index]}
                                            idx={index}
                                            favItem={favItem}
                                            setFavItem={setFavItem}/>
                                    </div>
                                )}
                                return true;
                            }) 
                        }
                        <div className='bottomButton'>
                            <div className='bot'>
                                <ListButton len={favItems.length / 5} setPage={setPage} selected={selected} setSelected={setSelected}/>
                            </div>
                        </div>
                        <div className='bottomButton'>
                            <div className='bot'>
                                <button 
                                    onClick={buttonClick} 
                                    style={{width: '100px', background: '#3aada8'}} 
                                    type="button" 
                                    className="btn btn-success">
                                    수정
                                </button>
                            </div>
                        </div>
                    </div>: 
                    <div style={{color:'white', fontSize:'30px', marginLeft: '156px'}}>
                        즐겨찾기 목록이 없습니다.
                    </div>
                }
            </div>
        </div>
    )
}

const ListButton = memo(({len, setPage, selected, setSelected}) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const arr = [];
        for(let i = 1; i <= Math.ceil(len); i++)
            arr.push(i);
        setList(arr);
    }, [len])

    const onClick = (e) => {
        setPage(e.target.value);
        setSelected(e.target.value);
    }

    const Button = styled.button`
        background: #6c757d;
        color: #ffffff;
        :hover{
            background: #6a7f7f;
        }
        :active{
            background: #000000;
        }
    `

    return (
        <div className='btn-toolbar' role='toolbar' aria-label="Toolbar with button groups">
            {
                list.map((items) => {
                    return (
                        <div key={items}>
                            {
                                parseInt(items) === parseInt(selected) ? 
                                <Button 
                                    type="button" 
                                    value={items}
                                    onClick={onClick}
                                    style={{background: '#000000'}}
                                    className="btn btn-secondary">
                                    {items}
                                </Button>:
                                <Button 
                                    type="button" 
                                    value={items}
                                    onClick={onClick}
                                    className="btn btn-secondary">
                                    {items}
                                </Button>
                            }
                        </div>
                )})
            }
        </div>
    )
})

export default MainFavorite;