import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.css';
import CommentList from './views/CommentList/commentList';
import NewComment from './views/NewComment/newComment';
import CommentDetail from './views/CommentDetail/commentDetail';

function App() {
  
  return (
    
    <BrowserRouter>
      <div >
        <h1 className="header">Comments</h1>
        <hr/>
        <div className="container">
          <Switch>
            <Route path="/" exact component={CommentList} />
            <Route path="/new" exact component={NewComment} />
            <Route path="/edit/:id" exact component={NewComment} />
            <Route path="/:id" exact component={CommentDetail} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
