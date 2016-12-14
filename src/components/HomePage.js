import React, { Component } from 'react';


class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h1>Hello Blog!</h1>
              <h4>Built by Chien-Sheng Wu</h4>
              <p><a className="btn btn-success btn-lg" href="#/articles" role="button">文章列表</a></p>
              <p><a className="btn btn-success btn-lg" href="#/articles/new" role="button">發表新文章</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
