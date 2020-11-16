import React from 'react';
import {withRouter} from 'react-router-dom';

import axios from 'axios';

import Config from '../../config/config';

const CommentComponent = (props) => {
    
    const deleteComment = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        axios.delete( Config.apiUrl +  props.comment.id).then((response) => {
            window.location.reload(false);
        }).catch((error) => {
            console.log(error);
        });

    }

    const redirectToEdit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        props.history.push('/edit/'+props.comment.id)
    }

    return(
        <div className="row list-group-item list-group-item-action">
            <div className="float-right ">
            <span className="badge badge-pill badge-secondary mr-1" onClick={redirectToEdit}>EDIT</span>
            <span className="badge badge-pill badge-secondary" onClick={deleteComment}>DELETE</span>             

            </div>
            <h5 className="mb-1">
                {props.comment.name} <small>({props.comment.email})</small>
            </h5>
            <p>{props.comment.comment}</p>
        </div>
    );

}

export default withRouter(CommentComponent);