import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Board.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import renderEmpty from 'antd/lib/config-provider/renderEmpty';
import { getBoards } from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button } from 'reactstrap';

// class Board extends Component {
const Board = (props) => {
    const [use, setUse] = useState({
        id: "순번",
        title: "제목",
        status: "상태",
        author: "작성자",
        time: "날짜",
    })
    const [data, setData] = useState([]);
    const [hi, setHi] = useState(1);

    useEffect(() => {
        console.log('useEffect');
        getBoards()
        .then(response => {
            localStorage.removeItem("articles"); // 초기화
            setData(response);
            console.log(response);
            console.log(data);
        })
    }, []);
    
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
            formatter: (cell, row) => {
                return (
                    <Link to={`/article/${row.id}`}>{cell}</Link>
                );
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
                return `${dateObj.getFullYear()}/${('0' + (dateObj.getMonth() + 1)).slice(-2)}/${('0' + dateObj.getDate()).slice(-2)}`;
            },
            headerStyle: () => {
                return { width: '100px' };
            },
        }
    ];
    return (
        <div>
            <div>
                {
                    localStorage.getItem('isLogin') === 'false' ?
                        <BeforeMenu /> :
                        <AfterMenu />
                }
            </div>
            <div className='boardScreen'>
                <ToolkitProvider
                    keyField="id"
                    data={data} // localStorgae값 불러오기
                    // data={data}
                    columns={columns}
                    search>
                    {
                        props => (
                            <div>
                                <h3>게시판</h3>
                                <SearchBar
                                    {...props.searchProps}
                                    className="custome-search-field"
                                    placeholder="검색" />
                                <hr />
                                <BootstrapTable
                                    striped
                                    hover
                                    condensed
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                    noDataIndication="내용이 없습니다"
                                />
                                {
                                    localStorage.getItem('isLogin') === 'false' ? '' :
                                        <Link to='/write'>
                                            <Button>글쓰기</Button>
                                        </Link>
                                }
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
    // }
}

export default Board;
