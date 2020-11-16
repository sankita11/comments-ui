import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

import Config from '../../config/config';

class NewCommentComponent extends Component{

    constructor(props){
        super(props)

        this.headerStyle = {
            textAlign: "center",
            textDecoration: "underline"
        }
    
        this.state = {
            formData: {
                name: '',
                email: '',
                comment: ''
            },
            commentID: props.match.params.id,
            errorMessage: ''
        }
    
    }

    componentDidMount() {
        if(this.props.match.params.id){
            this.fetchCommentByID(this.props.match.params.id);
        }
    }

    fetchCommentByID = (commentID) => {
        axios.get(Config.apiUrl + commentID).then(response => {
            this.setState({
                formData: response.data
            })
        });
    }

    submitForm = async (event) => {
        event.preventDefault();

        if(!this.state.formData.name || !this.state.formData.email || !this.state.formData.comment){
            this.setState({
                errorMessage : "* All fields are mandatory"
            });
            return;
        }

        if( !this.state.formData.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)){
            this.setState({
                errorMessage : "Invalid email format"
            });
            return;
        }

        if( this.state.commentID ){
            this.updateComment(this.state.commentID, this.state.formData);
        }else{
            this.createNewComment(this.state.formData);
        }
    }

    updateComment( commentID, comment) {
        axios.patch(Config.apiUrl + commentID, comment)
        .then(() => {
            this.props.history.push('/');
        }).catch((error) => {
            if(error.response){
                this.setState({
                    errorMessage : error.response.data.error
                })
            }
        });
    }

    createNewComment(comment){
        axios.put(Config.apiUrl, comment).then((response) => {
            this.props.history.push('/');
        }).catch((error) => {
            if(error.response){
                this.setState({
                    errorMessage : error.response.data.error
                })
            }
        });
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value =  target.value;
        const name = target.name;
        
        let formData = this.state.formData;
        formData[name] = value
    
        this.setState({
            formData: formData
        });
    }

   
    render() {
        return ( 
        
            <div className="col-12 new-post-container">
            <form onSubmit={this.submitForm}>
                <h3 style={this.headerStyle}>{ this.state.commentID ? "Edit Comment" : "Add Comment"}</h3>
                <div className="form-group">
                  <label>Name*</label>
                  <input type="text" value={this.state.formData.name} name="name" className="form-control" placeholder="Name" onChange={this.handleInputChange} />
                </div>
                <div className="form-group">
                  <label>
                    Email*
                  </label>
                  <input type="email" value={this.state.formData.email} name="email" className="form-control" placeholder="Email"  onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                  <label>
                    Comment*
                  </label>
                  <textarea name="comment" value={this.state.formData.comment} className="form-control" placeholder="Comment"  onChange={this.handleInputChange}/>
                  <button type="submit" className="btn btn-primary mt-4">Submit</button>
                  <Link to={'/'}><button type="submit" className="btn btn-secondary ml-2 mt-4">Cancel</button></Link>  
                  {this.state.errorMessage && <div className="alert alert-danger mt-2">{this.state.errorMessage}</div>}
                </div>
            </form>
            </div>
            );
        
    }  
   

}

export default NewCommentComponent;