import React, { useEffect, useState } from 'react';
import './Board.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
// import Data from './ArticleData'
import {getBoardOnce, getBoardCount, getBoards} from '../util/APIUtils'

// localStorage 초기화 영역 시작 

const data = [];

var count = 0;

getBoardCount()
    .then(res => {
        count= res
    });



getBoards()
    .then(response => {
        localStorage.removeItem("articles"); // 초기화
        
    response.map(res => {
        data.push({
            id: res.id,
            title: res.title,
            author: res.author,
            time: res.createdDate
        })
    })
    console.log(data);
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
        text: '등록일',
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
