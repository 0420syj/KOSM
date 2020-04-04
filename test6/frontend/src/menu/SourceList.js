import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import OpenSourceData from '../data/OpenSourceData';
import './SourceList.scss';
import { WIDTH, HEIGHT } from '../constants';
import { useEffect } from 'react';
import {getProjectAll} from '../util/APIUtils'
const SourceList = memo(() => {
    const [data, setData] = useState([]);                       //검색했을 때 나오는 리스트를 담은 배열
    const [inputText, setInputText] = useState('');             //검색창에 들어가는 데이터
    const [openSourceData, setOpenSource] = useState([]);       //검색하기 전 오픈소스 리스트
    const onChange = useCallback((e) => {
        setInputText(e.target.value);     //검색하는 문자들을 소문자로 변환해준다.
        setData(openSourceData.filter(item => {
            return item.name.toLowerCase().indexOf(e.target.value) !== -1
        }));
    });

    useEffect(() => {       //모든 프로젝트 리스트를 받아오면 OpenSourceData에 해당 데이터를 push해준다.
        if(OpenSourceData.length === 0)
            openSourceData.map(item => OpenSourceData.push(item))
    }, [openSourceData.length])

    useEffect(() => {       //화면이 렌더링 되기 전에 getProjectAll()를 이용해서 서버에서 오픈소스 리스트들을 받아온다.
        getProjectAll()
            .then(res => setOpenSource(res))
            .catch(e => console.log(e));
    }, [])

    return (
        <div
            style={{
                width: `444px`,
                height: `915px`,
                background: '#414141',
                paddingLeft: `48px`,
                paddingTop: `38px`,
            }}>
            <div
                style={{
                    color: '#e4e4e4',
                    width: `${WIDTH * 121}px`,
                    height: '41px',
                    fontFamily: 'NotoSans',
                    fontSize: '30px',
                    fontWeight: 'bold',
                    fontStretch: 'normal',
                    fontStyle: 'normal',
                    lineHeight: '1.37',
                    letterSpacing: 'normal',
                    textAlign: 'left',
                    marginBottom: '33px' // 41 + 33 = 74
                }}>
                Projects
                </div>
            <div>
                <label
                    style={{
                        justifyContent: 'left',
                        display: 'flex'
                    }}>
                    <input
                        type='text'
                        placeholder='Search...'
                        style={{
                            fontFamily: 'NotoSans',
                            width: '361px',
                            height: '44px',
                            border: 'none',
                            borderRadius: '9px',
                            backgroundColor: '#f5f5f5',
                            padding: '2px 8px',
                            marginBottom: '52px' // 44 + 52 = 96
                        }}
                        onChange={onChange} />
                </label>
            </div>
            <div
                style={{
                    overflowY: 'scroll',
                    height: '702px' // 실제 길이
                }}>
                <ul
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '9px',
                        fontFamily: 'NotoSans',
                        fontSize: '20px',
                        lineHeight: '34px',
                        letterSpacing: '2px',
                    }}>
                    {
                        inputText.length === 0 ?
                        openSourceData.map(item => {
                            return (
                            <li key={item.id}>
                                <Link to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>
                            </li>)
                        }) :
                        data.map(item => {
                            return <li key={item.id}>
                                <Link
                                    to={`/source/${item.name}`}
                                    className='sourceList'>
                                    {item.name}
                                </Link>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
});

export default SourceList;
