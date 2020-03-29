import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { getBoards } from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import SourceList from '../menu/SourceList';
import { Button, Badge } from 'reactstrap';
import './Board.scss';

const Board = (props) => {
    
    // const [use, setUse] = useState({
    //     id: "순번",
    //     title: "제목",
    //     status: "상태",
    //     author: "작성자",
    //     time: "날짜",
    // })

    const [data, setData] = useState([]);

    useEffect(() => {
        getBoards()
            .then(response => {
                setData(response);
                //console.log(response);
            })
    }, []);

    const { SearchBar } = Search;

    const renderButton = () => {
        if (sessionStorage.getItem('isLogin') !== 'false') {
            return (<div 
                align="right"
                >
                <Link to='/write'>
                    <Button className="button-write">작성하기</Button>
                </Link>
            </div>)
        }
    };

    const renderTopMenu = () => {
        if (sessionStorage.getItem('isLogin') !== 'false')
            return <AfterMenu />
        else
            return <BeforeMenu />
    };

    const columns = [
        {
            dataField: 'id',
            text: '번호',
            type: 'number',
            style: {
                padding: '0px',
            },
            headerStyle: () => {
                return {
                    width: '70px'
                };
            },
        },
        {
            dataField: 'title',
            text: '제목',
            style: {
                textAlign: 'left',

                paddingTop: '0px',
                paddingBottom: '0px',
                // paddingRight: '50px',
                // paddingLeft: '50px',
            },
            headerStyle: () => {
                return {
                    width: '200px',
                };
            },
            formatter: (cell, row) => {
                return (
                    <Link to={`/article/${row.id}`} className="column-title">{cell}</Link>
                );
            },
        },
        {
            dataField: 'status',
            text: '상태',
            style: {
                padding: '0px',
            },
            headerStyle: () => {
                return {
                    width: '90px',
                };
            },
            // https://reactstrap.github.io/components/badge/ 참고
            formatter: (str) => {
                let status = str;

                if(status === "접수")
                    return <Badge color="danger">접수</Badge>
                else if(status === "처리중")
                    return <Badge color="warning">처리중</Badge>
                else if(status === "완료")
                    return <Badge color="success">완료</Badge>
                else
                    return <Badge color="primary">오류! 카톡바람!</Badge>
            },
        },
        {
            dataField: 'author',
            text: '글쓴이',
            style: {
                padding: '0px',
            },
            headerStyle: () => {
                return {
                    width: '160px'
                };
            },
        },
        {
            dataField: 'createdDate',
            text: '등록일',
            type: 'date',
            formatter: (cell) => {
                let dateObj = cell;
                if (typeof cell !== 'object') {
                    dateObj = new Date(cell);
                }
                return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
            },
            style: {
                padding: '0px',
            },
            headerStyle: () => {
                return {
                    width: '160px'
                };
            },
        }
    ];

    const pageButtonRenderer = ({
        page,
        active,
        // disable,
        // title,
        onPageChange
      }) => {
        // console.log("page : " + page)
        const handleClick = (e) => {
          e.preventDefault();
          onPageChange(page);
        };
        const activeStyle = {};
        if (active) {
          activeStyle.color = '#3aada8';
          activeStyle.textDecoration = 'underline';
        } else {
          activeStyle.color = '#eaeaea';
        }

        if (typeof page === 'string') {
          activeStyle.color = '#eaeaea';
        }

        return (
          <li key={page.toString()}>
              <a href="#board-title" onClick={ handleClick } style={ activeStyle } className="page-button">{ page }</a>
          </li>
        );
      };

    const options = {
        custom: true,
        totalSize: data.length,
        pageButtonRenderer,
        prePageText: '◀',
        nextPageText: '▶',
    };

    return (
        <div className="container">
            <div className="top">
                {renderTopMenu()}
            </div>
            <div className="left">
                <SourceList />
            </div>
            <div className="board">
                <div className='board-container'>
                    <ToolkitProvider
                        keyField="id"
                        data={data}
                        columns={columns}
                        search>
                        {
                            props => (
                                <div>
                                    <h3 className="board-title" id="board-title">게시판</h3>
                                    <div style={{ float: 'right', clear: 'both' }}>
                                        <SearchBar
                                            {...props.searchProps}
                                            className="search-field"
                                            placeholder="Search..."
                                        />
                                    </div>
                                    <PaginationProvider
                                        pagination={paginationFactory(options)}
                                    >
                                        {
                                            ({
                                                paginationProps: {
                                                    ...paginationProps
                                                },
                                                paginationTableProps
                                            }) => (
                                                    <>
                                                        <BootstrapTable
                                                            bordered={false}
                                                            classes="table-borderless table-wrap"
                                                            headerWrapperClasses="table-head"
                                                            bodyClasses="table-body"
                                                            {...props.baseProps}
                                                            {...paginationTableProps}
                                                            noDataIndication="내용이 없습니다"
                                                        />
                                                        {renderButton()}
                                                        <div className="page-container">
                                                            <PaginationListStandalone
                                                                {...paginationProps}
                                                        />
                                                        </div>
                                                    </>
                                                )
                                        }
                                    </PaginationProvider>
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            </div>
            <div className="bottom">
                Footer
            </div>
        </div>
    )
}



export default Board;
