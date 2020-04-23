import React, { useState, memo } from 'react';
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
    // Warning 삭제
    // eslint-disable-next-line
    const [openSource, setOpenSource] = useState([]);       //검색하기 전 오픈소스 리스트

    // 카테고리 Open 상태관리
    const [isOpenApache, setIsOpenApache] = useState(true);
    const [isOpenOthers, setIsOpenOthers] = useState(true);

    // 카테고리별 토글 Function
    const toggleApache = () => setIsOpenApache(!isOpenApache);
    const toggleOthers = () => setIsOpenOthers(!isOpenOthers);

    const onChange = (e) => {
        setInputText(e.target.value);     //검색하는 문자들을 소문자로 변환해준다.
        setData(OpenSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
        }));
    };


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
                        setOpenSource(openSource => [
                            ...openSource,
                            item
                        ])
                        OpenSourceData.push(item);
                        return true;
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
                        setOpenSource(openSource => [
                            ...openSource,
                            item
                        ])

                        OpenSourceData.push(item);
                        return true;
                    });
                    
                })
                .catch(e => console.log(e));
        }
    }, [])

    const Category = memo(({title, body, toggle, isOpen}) => {
        return (
            <>
                <Button 
                    color="secondary" 
                    onClick={toggle} 
                    className="btn-category">
                    {isOpen ? <IoIosArrowDown/> : <IoIosArrowForward/>} {title} ({body.length})
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
                                OpenSourceData.length !== 0 &&
                                <>
                                    <Category title={'Apache'} body={apaches} toggle={toggleApache} isOpen={isOpenApache}/>
                                    <Category title={'Others'} body={others} toggle={toggleOthers} isOpen={isOpenOthers}/>
                                </>
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
