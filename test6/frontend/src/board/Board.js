import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationTotalStandalone, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { getBoards } from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import { Button } from 'reactstrap';
import './Board.scss';

const Board = (props) => {
    const [use, setUse] = useState({
        id: "순번",
        title: "제목",
        status: "상태",
        author: "작성자",
        time: "날짜",
    })
    const [data, setData] = useState([]);

    useEffect(() => {
        getBoards()
        .then(response => {
            setData(response);
        })
    }, []);

    const { SearchBar } = Search;

    const renderButton = () => {
        if(localStorage.getItem('isLogin') !== 'false')
        {
            return (<div style={{float:'right', clear:'both'}}>
            <Link to='/write'>
                <Button className="button-write">작성하기</Button>
            </Link>
        </div>)
        }
    };

    const columns = [
        {
            dataField: 'id',
            text: '번호',
            type: 'number',
            headerStyle: () => {
                return { width: '70px' };
            },
        },
        {
            dataField: 'title',
            text: '제목',
            formatter: (cell, row) => {
                return (
                    <Link to={`/article/${row.id}`} className="column-title">{cell}</Link>
                );
            },
        },
        {
            dataField: 'status',
            text: '상태',
            headerStyle: () => {
                return { width: '90px' };
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
            // formatter: (cell) => {
            //     let dateObj = cell;
            //     if (typeof cell !== 'object') {
            //         dateObj = new Date(cell);
            //     }
            //     return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
            // },
            headerStyle: () => {
                return { width: '121px' };
            },
        }
    ];

    const sizePerPageOptionRenderer = ({
        text,
        page,
        onSizePerPageChange
      }) => (
        <li
          key={ text }
          role="presentation"
          className="dropdown-item"
        >
          <a
            href="#"
            tabIndex="-1"
            role="menuitem"
            data-page={ page }
            onMouseDown={ (e) => {
              e.preventDefault();
              onSizePerPageChange(page);
            } }
            style={ { color: 'red' } }
          >
            { text }
          </a>
        </li>
      );
      
      const options = {
        sizePerPageOptionRenderer
      };
      
    return (
        <div>
            <div>
                {
                    localStorage.getItem('isLogin') === 'false' ?
                        <BeforeMenu /> :
                        <AfterMenu />
                }
            </div>
            <div className='board-container'>
                <ToolkitProvider
                    keyField="id"
                    data={data}
                    columns={columns}
                    search>
                    {
                        props => (
                            <div>
                                <h3 className="board-title">게시판</h3>
                                <div style={{float:'right', clear:'both'}}>
                                    <SearchBar
                                    {...props.searchProps}
                                    className="search-field"
                                    placeholder="Search..."
                                    />
                                </div>
                                <BootstrapTable
                                    bordered={ false }
                                    classes="table-borderless table-wrap"
                                    headerWrapperClasses="table-head"
                                    bodyClasses="table-body"
                                    {...props.baseProps}
                                    //pagination={paginationFactory()}
                                    pagination={paginationFactory(options)}
                                    noDataIndication="내용이 없습니다"
                                />
                                {renderButton()}
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    )
}

export default Board;
