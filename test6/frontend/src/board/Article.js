import { Component } from 'react'

class Article extends Component {
    
    render() {
        return (
            <h2>{this.props.id}</h2>
        );
    }
}

export default Article;
