import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './SourceList.scss';
import { useEffect } from 'react';
import {getProjectAll} from '../util/APIUtils'
import OpenSourceData from '../data/OpenSourceData';
import {apaches, others} from '../data/OpenSourceData';
import { Collapse, Button } from 'reactstrap';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const SourceList = memo(() => {
    const [data, setData] = useState([]);                       //검색했을 때 나오는 리스트를 담은 배열
    const [inputText, setInputText] = useState('');             //검색창에 들어가는 데이터
    const [openSourceData, setOpenSource] = useState([]);       //검색하기 전 오픈소스 리스트
    const [isOpen, setIsOpen] = useState(false);                //카테고리 Open 상태인지 체크
    const toggle = () => setIsOpen(!isOpen);                    //카테고리 토글 상태

    const onChange = useCallback((e) => {
        setInputText(e.target.value);     //검색하는 문자들을 소문자로 변환해준다.
        setData(OpenSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value) !== -1
        }));
    });


    useEffect(() => {       //화면이 렌더링 되기 전에 getProjectAll()를 이용해서 서버에서 오픈소스 리스트들을 받아온다.
        if(OpenSourceData.length === 0){
            getProjectAll()
                .then(res => {
                    res.Apache.map(item => {
                        apaches.push(                   //apache에 저장            
                            <li key={item.id}>
                                <Link to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>                    
                            </li>
                        )
                        OpenSourceData.push(item);
                    });
                    res.default.map(item => {       //임시로 other에 저장한 데이터
                        others.push(
                            <li key={item.id}>
                                <Link to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>                    
                            </li>
                        );    
                        OpenSourceData.push(item);
                    });
                })
                .catch(e => console.log(e));
        }
    }, [])

    const Category = memo(({title, body}) => {
        return (
            <>
                <Button 
                    color="secondary" 
                    onClick={toggle} 
                    className="btn-category">
                    {isOpen ? <IoIosArrowDown/> : <IoIosArrowForward/>}{title}
                </Button>
                <Collapse 
                    isOpen={isOpen}
                    className="opensource-item">
                    {body}
                </Collapse>
            </>
        )
    })

    return (
        <div className='source-list-container'>
            <div className='project'>
                Projects
            </div>
            <div>
                <label className='label'>
                    <input
                        type='text'
                        placeholder='Search...'
                        className='input'
                        onChange={onChange} />
                </label>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    height: 'calc(100% - 178px)' // 원래길이 699px
                }}>
                <ul className="opensource-item">
                    {
                        inputText.length === 0 ?            //아무런 검색이 안될 때
                        <div>
                            {
                                OpenSourceData.length != 0 &&
                                <div>
                                    <Category title={'Apache'} body={apaches}/>
                                    <Category title={'others'} body={others}/>
                                </div> 
                            }
                        </div> : 
                        data.map(item => {
                            return (
                            <li key={item.id}>
                                <Link
                                    to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
});

export default SourceList;
