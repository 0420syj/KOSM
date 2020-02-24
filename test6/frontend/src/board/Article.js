import React, { Component } from 'react'
import { getArticle } from '../util/APIUtils'

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "순번",
            title: "제목",
            content: "내용",
            author: "작성자",
            status: "상태",
            date: "날짜",
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
        const { title, content, author, status, date } = this.state;

        return (
            <div>
                <h2>제목 : {title}</h2>
                <h2>내용 : {content}</h2>
                <h4>작성자 : {author}</h4>
                <h4>상태 : {status}</h4>
                <h4>날짜 : {date}</h4>
            </div>
        );
    }
}
export default Article;
