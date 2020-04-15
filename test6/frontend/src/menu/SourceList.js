import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
import './SourceList.scss';
import { WIDTH } from '../constants';
import { useEffect } from 'react';
import {getProjectAll} from '../util/APIUtils'
import { Collapse, Button } from 'reactstrap';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const SourceList = memo(() => {
    const [data, setData] = useState([]);                       //검색했을 때 나오는 리스트를 담은 배열
    const [inputText, setInputText] = useState('');             //검색창에 들어가는 데이터
    const [openSourceData, setOpenSource] = useState([]);       //검색하기 전 오픈소스 리스트
    const [isOpen, setIsOpen] = useState(false);                //카테고리 Open 상태인지 체크
    const [apache, setApache] = useState([]);
    
    const toggle = () => setIsOpen(!isOpen);                    //카테고리 토글 상태

    const onChange = useCallback((e) => {
        setInputText(e.target.value);     //검색하는 문자들을 소문자로 변환해준다.
        setData(openSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value) !== -1
        }));
    });

    useEffect(() => {       //모든 프로젝트 리스트를 받아오면 OpenSourceData에 해당 데이터를 push해준다.
        if(OpenSourceData.length === 0) {
            openSourceData.map(item => {
                OpenSourceData.push(item)
                if(item.name.substr(0,6) === "Apache") // 앞글자 Apache 따로 분류
                    setApache(apache => [...apache, <li key={item.id}>
                        <Link to={`/source/${item.name}`}
                            className='sourceList'>
                            {item.name}
                        </Link>
                    </li>
                ]);
            })
        }
    }, [openSourceData.length])

    useEffect(() => {       //화면이 렌더링 되기 전에 getProjectAll()를 이용해서 서버에서 오픈소스 리스트들을 받아온다.
        getProjectAll()
            .then(res => setOpenSource(res))
            .catch(e => console.log(e));
    }, [])

    const Category = memo(({title, body}) => {
        return (
            <>
                <Button color="secondary" onClick={toggle} className="btn-category">
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
                { inputText.length === 0 && <Category title={"Apache"} body={apache}/>}
                <ul className="opensource-item">
                    {
                        inputText.length === 0 ?
                        OpenSourceData.map(item => {
                            if(item.name.substr(0,6) !== "Apache")
                                return (
                                <li key={item.id}>
                                    <Link to={`/source/${item.name}`}
                                        className='sourceList'>
                                        {item.name}
                                    </Link>
                                </li>)
                        }) : 
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
