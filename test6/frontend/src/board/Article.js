import React, { Component } from 'react'
import { Button, Badge } from 'reactstrap';

import { getArticle } from '../util/APIUtils'
import BeforeMenu from '../menu/before/BeforeMenu';
import AfterMenu from '../menu/after/AfterMenu';
import SourceList from '../menu/SourceList';
import Footer from '../menu/Footer'
import './Article.scss';

class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "순번",
            title: "제목",
            content: "내용",
            author: "작성자",
            status: "상태",
            date: "날짜 : 이게 출력된다는 건 게시글 load 실패했다는 뜻",
        }
    }

    
    componentDidMount() {
        getArticle(this.props.match.params.id)
            .then(res => {
                this.setState({
                    id: res.id,
                    title: res.title,
                    content : res.content,
                    author : res.author,
                    status : res.status,
                    date : res.createdDate,
                })
            })
    }

    render() {

        // 게시글 정보
        const { title, content, author, status, date } = this.state;

        // 상단메뉴 출력 함수
        const renderTopMenu = () => {
            if (sessionStorage.getItem('isLogin') !== 'false')
                return <AfterMenu />
            else
                return <BeforeMenu />
        };

        // 날짜 정보 가공 함수
        const printDate = (date) => {
            let dateObj = date;
            if (typeof date !== 'object') {
                dateObj = new Date(date);
            }
            return `${dateObj.getFullYear()}-${('0' + (dateObj.getMonth() + 1)).slice(-2)}-${('0' + dateObj.getDate()).slice(-2)}`;
        }

        const goBoard = () => {
            this.props.history.push('/board')
        }

        const statusLabel = () => {
            if(status === "접수")
                return <Badge color="danger">접수</Badge>
            else if(status === "처리중")
                return <Badge color="warning">처리중</Badge>
            else if(status === "완료")
                return <Badge color="success">완료</Badge>
        }

        return (
            <div className="container">
                <div className="top">
                    {renderTopMenu()}
                </div>
                <div className="left">
                    <SourceList/>
                </div>
                <div className="article">
                    <div className="article-container">
                        <div className="article-header">
                            <div className="left-article-header">
                                <div>제목 : {title} {statusLabel()}</div>
                            </div>
                            <div className="right-article-header">
                                <div>{printDate(date)}</div>
                            </div>
                        </div>
                        <div className="article-body">
                            <div className="article-author">
                                작성자 : {author}
                            </div>
                            <div className="article-content-area">
                                {content}
                            </div>
                        </div>
                        <div className="article-back-button-area">
                            <Button
                                className="go-board-button"
                                onClick={goBoard}
                                >
                                ≡ 목록
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <Footer/>
                </div>
            </div>
        );
    }
}
export default Article;
