import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Board.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import {getBoardOnce, getBoardCount, getBoards} from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button } from 'reactstrap';

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
            status: '처리중', // 임시 데이터
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
        text: '제목',
        headerStyle: () => {
            return { width: '120px' };
        },
    },
    {
        dataField: 'status',
        text: '상태',
        headerStyle: () => {
            return { width: '60px' };
        },
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
        type: 'date',
        formatter: (cell) => {
            let dateObj = cell;
            if (typeof cell !== 'object') {
              dateObj = new Date(cell);
            }
            return `${dateObj.getUTCFullYear()}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${('0' + dateObj.getUTCDate()).slice(-2)}`;
          },
        headerStyle: () => {
            return { width: '100px' };
        },
    }
];
  
const Board = () => {
    return (
        <div>
            <div>
                {
                    localStorage.getItem('isLogin') === 'false' ?
                    <BeforeMenu/>:
                    <AfterMenu/>
                }
            </div>
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
                                {
                                localStorage.getItem('isLogin') === 'false' ? '' :
                                <Link to='/write'>
                                    <Button>글쓰기</Button>
                                </Link>}
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
};

export default Board;
