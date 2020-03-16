/*
    로그인하고 난 후의 첫 화면
*/
import React, {useState, useEffect} from 'react';
import FavoriteList from './FavoriteList';
import './MainFavorite.scss';
import {deleteFavProject} from '../../../util/APIUtils';
import {getFavProject} from '../../../util/APIUtils';
const MainFavorite = ({favItems, setFavItems}) => {
    const [idx, setIdx] = useState(1);
    const [favItem, setFavItem] = useState([]);
    const [page, setPage] = useState(1);
    let index = -1;
    const buttonClick = () => {
        const temp = [];
        temp.push({
            id: 0,
            name: sessionStorage.getItem('email')
        });
        let i = 0;
        favItem.map((item) => {
            if(item === false)
                temp.push(favItems[i]);
            i++;
        })
        //객체로 전달할 수 있는 delete함수 하나 더 만들고 구현하기
        //temp에 내가 삭제해야 할 값들이 들어있음.
        console.log(temp);
        deleteFavProject(temp)
        .then(() => {
            getFavProject(sessionStorage.getItem('userId'))
            .then(res => {
                setFavItems(res);
            })

        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        const obj = [];
        let i = 0;
        favItems.map((items) => {
            obj.push(true);            
        })
        setFavItem(obj);
    }, [favItems])
        
    return ( 
        <div className='favoriteContainer'>
            <div className='favTitle'>내 즐겨찾기</div>
            <div className='favTitle2'>
                <div style={{marginRight:`285px`}} className='favTitle3'>패치 업데이트</div>
                <div className='favTitle3'>취약점 업데이트</div>
            </div>
            <div className='favContents'>
                {
                    favItems.length != 0 ?
                    favItems.map((items) => {
                        index++;
                        if(index >= (page - 1) * 5 && index < 5 * page) {
                        return (
                            <div key={items.id} style={{color: '#FFFFFF'}}>
                                <FavoriteList 
                                    name={items.name} 
                                    type={favItem[index]}
                                    idx={index}
                                    favItem={favItem}
                                    setFavItem={setFavItem}/>
                            </div>)}

                    }) : 
                    <div style={{color:'white', fontSize:'50px'}}>
                        즐겨찾기 목록이 없습니다.
                    </div>
                }
                <div className='bottomButton'>
                    <div className='bot'>
                        <ListButton len={favItems.length / 5} setPage={setPage}/>
                    </div>
                </div>
                <div className='bottomButton'>
                    <div className='bot'>
                        <button onClick={buttonClick} style={{width: '100px', background: '#3aada8'}} type="button" className="btn btn-success">확인</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ListButton = (props) => {
    const [list, setList] = useState([]);
    useEffect(() => {
        const arr = [];
        for(let i = 1; i <= props.len + 1; i++)
            arr.push(i);
        setList(arr);
    }, [])

    return (
        <div className='btn-toolbar' role='toolbar' aria-label="Toolbar with button groups">
            {
                list.map((items) => {
                    return (
                        <button 
                            key={items} 
                            onClick={() => {props.setPage(items)}} 
                            type="button" 
                            className="btn btn-secondary">
                            {items}
                        </button>
                )})
            }
        </div>
    )
}

export default MainFavorite;