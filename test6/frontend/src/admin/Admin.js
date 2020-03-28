import React, {useState, useEffect} from 'react';
import { checkAdmin, getBoards, deleteBoard, modifyBoard } from '../util/APIUtils';
import { Button, Badge } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import './Admin.scss'

const Admin = () => {

    const [userInfo, setUserInfo] = useState({
        password:'1111',
    })

    const [isAdmin, setIsAdmin] = useState({
        isAdmin: false
    })

    const [boardData, setBoardData] = useState([])

    const onChange= (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        checkAdmin(userInfo)
        .then(() => {
            //alert("Success")
            setIsAdmin({
                isAdmin: true
            })
            }).catch((error) => {
                alert("Error!")
                setIsAdmin({
                    isAdmin: false
                })
                console.log(error)
            });
        };

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
    
        // const renderButton = () => {
        //     if (sessionStorage.getItem('isLogin') !== 'false') {
        //         return (<div 
        //             align="right"
        //             >
        //             <Link to='/write'>
        //                 <Button className="button-write">작성하기</Button>
        //             </Link>
        //         </div>)
        //     }
        // };

        const handleDelete = (e) => {
            e.preventDefault();
            var boardId = boardData.map(val => {
                return val.id;
            })
            // console.log(boardId);
            deleteBoard(boardId).then(() => {
                alert("정상적으로 삭제되었습니다.");
            }).catch((error) => {
                alert("Delete Fail")
                console.log(error)
            });
        };

        const hiddenRowKeys = [];
    
        const handleSave = (e) => {
            e.preventDefault();
            console.log(boardData.length);
            boardData.map(val => {
                console.log(val.id + "," + val.status);
            })

            modifyBoard(boardData).then(() => {
                alert("정상적으로 저장되었습니다.");
            }).catch((error) => {
                alert("Save Fail")
                console.log(error)
            });
        };

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            clickToEdit: true,
            onSelect: (row, isSelect, e) => {
                var data = {
                    id: row.id,
                    status: row.status,
                };
                if(isSelect) {
                    setBoardData(boardData.concat(data));
                    console.log("추가");
                }
                else {
                    const items = boardData.filter(item => item.id !== data.id)
                    setBoardData(items);
                    console.log("삭제");
                }
                //console.log(e);
            },
            onSelectAll: (isSelect, rows, e) => {
                var rowsData = rows.map(value => {
                    var data = {};
                    data.id = value.id;
                    data.status = value.status;
                    return data;
                });
                console.log(rowsData)

                isSelect ? setBoardData(rowsData) : setBoardData([]);
                //console.log(e);
            },
            /*
            selectColumnStyle: ({
                checked,
                disabled,
                rowIndex,
                rowKey
              }) => {
                if (checked) {
                  return {
                    backgroundColor: 'white'
                  };
                }
                return {
                  //backgroundColor: 'red'
                };
              }
            */
           style: {
               backgroundColor: '#3aada8'
           },
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
                editable: false,
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
                },
                editor: {
                    type: Type.SELECT,
                    options: [{
                        value: '접수',
                        label: '접수'
                      },{
                      value: '처리중',
                      label: '처리중'
                    }, {
                      value: '완료',
                      label: '완료'
                    }]
                  }
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
                editable: false,
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
                editable: false,
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
              <li>
                  <a href="#" onClick={ handleClick } style={ activeStyle } className="page-button">{ page }</a>
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





        const renderAdmin = () => {
            if (isAdmin.isAdmin === true)
            {
                return (
                    <div className="manage-container">
                        <div className="manage-board">
                            <div className='board-container'>
                                <ToolkitProvider
                                    keyField="id"
                                    data={data}
                                    columns={columns}
                                    search>
                                    {
                                        props => (
                                            <div stlye={{ height: '100%', }}>
                                                <h3 className="board-title">게시판</h3>
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
                                                                        selectRow={ selectRow }
                                                                        hiddenRows={ hiddenRowKeys }
                                                                        cellEdit={ cellEditFactory({ mode: 'dbclick', blurToSave: true }) }
                                                                        bordered={false}
                                                                        classes="table-borderless table-wrap"
                                                                        headerWrapperClasses="table-head"
                                                                        bodyClasses="table-body"
                                                                        {...props.baseProps}
                                                                        {...paginationTableProps}
                                                                        noDataIndication="내용이 없습니다"
                                                                    />
                                                                    <>
                                                                        <Button color="danger" onClick={handleDelete}>삭제</Button>
                                                                        <Button color="primary" onClick={handleSave}>저장</Button>
                                                                    </>
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
                    </div>
                )
            }

            else
            {
                return (
                    <div className="admin-container">
                        <div className="admin-title">관리자 전용 페이지입니다.</div>
                        <div className="admin-content">비밀번호를 입력해주세요</div>
                        <div className="admin-form">
                            <form onSubmit={onSubmit}>
                                <input
                                    name="password"
                                    onChange={onChange}
                                    type="password"
                                    className="input-admin-password"
                                    />
                                <Button className="admin-button">
                                    확인
                                </Button>
                            </form>
                        </div>
                    </div>
                )
            }
        };

    
    return ( 
        <>
            {renderAdmin()}
        </>
    )
}

export default Admin;