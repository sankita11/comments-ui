import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Comment from '../../component/Comment/comment';
import Config from '../../config/config';

import './commentList.css';

class CommentListComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            comments : [],
        }
    }

    componentDidMount(){
        this.fetchCommentList();        
    }

    fetchCommentList = () => {
        axios.get(Config.apiUrl + 'all').then(response => {
            this.setState({
                comments: response.data
            })
        }).catch((error) => {
            console.log(error)
        });
    }

    render() {
        
        const comments = this.state.comments.map((eachComment) => {
            return <Link key={eachComment.id}  to={"/" + eachComment.id}><Comment comment={eachComment}/></Link>
        })
        
        return(
            <div className="row">
                <Link to={'/new'}>
                    <div className="col-12 mb-2">
                        <button className="btn btn-primary" onClick={this.showAddForm}>+Add Post</button>
                    </div>
                </Link>
                <div className="col-12">
                    <div className="list-group">
                        {comments}
                    </div>
                </div>
            </div>
               
        );
    }
}

export default CommentListComponent;