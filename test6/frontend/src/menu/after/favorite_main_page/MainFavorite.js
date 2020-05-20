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
            }).catch(() => {})
    }
    
    useEffect(() => {
        const obj = [];
        favItems.map(() => obj.push(true))
        setFavItem(obj);
    }, [favItems])

    const diffDays = (calcDate) => {
        // One day Time in ms (milliseconds) 
        var one_day = 1000 * 60 * 60 * 24

        // To set present_dates to two variables 
        var present_date = new Date();

        // To Calculate next year's Christmas if passed already. 
        if (present_date.getMonth() == 11 && present_date.getdate() > 25)
            calcDate.setFullYear(calcDate.getFullYear() + 1)

        // To Calculate the result in milliseconds and then converting into days 
        var Result = Math.round(present_date.getTime() - calcDate.getTime()) / (one_day);

        // To remove the decimals from the (Result) resulting days value 
        var Final_Result = Result.toFixed(0) - 1;

        return Final_Result;
    }

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

                                // Pubilsh Date 계산
                                var publishDate = new Date(items.date2),
                                publishMonth = '' + (publishDate.getMonth()),
                                publishDay = '' + publishDate.getDate(),
                                publishYear = publishDate.getFullYear();

                                // Modify Date 계산
                                var modifyDate = new Date(items.date),
                                modifyMonth = '' + (modifyDate.getMonth()),
                                modifyDay = '' + modifyDate.getDate(),
                                modifyYear = modifyDate.getFullYear();

                                // 날짜 차이 계산
                                var diffPublish = diffDays(new Date(publishYear, publishMonth, publishDay))
                                var diffModify = diffDays(new Date(modifyYear, modifyMonth, modifyDay))

                                var flag = diffPublish <= 7 || diffModify <= 7

                                if(index >= (page - 1) * 5 && index < 5 * page) {
                                return (
                                    <div key={items.id} style={{color: '#FFFFFF'}}>
                                        <FavoriteList 
                                            publish={items.date2}
                                            modify={items.date}
                                            name={items.name}
                                            flag={flag}
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