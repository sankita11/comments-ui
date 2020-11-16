import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import CommentComponent from '../../component/Comment/comment';
import Config from '../../config/config';

import axios from 'axios';

class CommentDetailComponent extends Component{
    constructor(props){
        super(props)

        this.state = {
            comment : {},
        }
    }

    componentDidMount(){
        this.fetchCommentByID(this.props.match.params.id)
    }
    
    fetchCommentByID = (commentID) => {
        axios.get(Config.apiUrl + commentID).then(response => {
            this.setState({
                comment: response.data
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return(
            <div>
                <Link to={'/'}>Home</Link>
                <CommentComponent comment={this.state.comment}/>
            </div>
        );
    
    }

}

export default CommentDetailComponent;