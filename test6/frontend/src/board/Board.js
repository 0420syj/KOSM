import React, { useEffect, useState } from 'react';
import './Board.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
// import Data from './ArticleData'
import {getBoardOnce, getBoardCount} from '../util/APIUtils'

// localStorage 초기화 영역 시작 

const data = [
    {
        id: 5,
        title: '안녕하세요',
        author: '강파고',
        time: '2020.01.31',
    },
    {
        id: 6,
        title: '이럴수가',
        author: '완파고',
        time: '2020.02.04',
    },
    {
        id: 7,
        title: '정말',
        author: '손파고',
        time: '2020.01.29',
    },
    {
        id: 8,
        title: '멋져요',
        author: '백파고',
        time: '2020.02.03',
    },
];

var count = 0;

getBoardCount()
    .then(res => {
        count= res
        console.log(count)
    });

    getBoardOnce(1)
        .then(response => {
            localStorage.removeItem("articles"); // 초기화
            data.push({
                id: response.id,
                title: response.title,
                author: response.author,
                time: response.createdDate
            })
            localStorage.articles = JSON.stringify(data); // localStorage에 저장
        });


// localStorage 초기화 끝 

const { SearchBar } = Search;

const columns = [
    {
        dataField: 'id',
        text: '번호',
        type: 'number',
        headerStyle: () => {
            return { width: '60px' };
        },
    },
    {
        dataField: 'title',
        text: '제목'
    },
    {
        dataField: 'author',
        text: '글쓴이',
        headerStyle: () => {
            return { width: '120px' };
        },
    },
    {
        dataField: 'time',
        text: '날짜',
        //type: 'date',
        headerStyle: () => {
            return { width: '100px' };
        },
    }
];
  
const Board = () => {
    
    useEffect(() => {
        
    }, []);

    return (
        <div className='boardScreen'>
            <ToolkitProvider
                keyField="id"
                data={ JSON.parse(localStorage.articles) } // localStorgae값 불러오기
                columns={ columns }
                search>
                {
                    props => (
                        <div>
                            <h3>게시판</h3>
                            <SearchBar
                                { ...props.searchProps }
                                className="custome-search-field"
                                placeholder="검색"/>
                            <hr />
                            <BootstrapTable
                                striped
                                hover
                                condensed
                                { ...props.baseProps }
                                pagination={ paginationFactory() } 
                                noDataIndication="내용이 없습니다"
                            />
                        </div>
                    )
                }
            </ToolkitProvider>
        </div>
    )
};

export default Board;
