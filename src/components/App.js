import React, { Component } from 'react';

import HomePage from './HomePage';
import ArticlesPage from './ArticlesPage';
import SingleArticlePage from './SingleArticlePage';
import CreateArticlePage from './CreateArticlePage';

class App extends Component {
  state = {
    route: window.location.hash.substr(1),
  };

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1),
      });
    });
  }

  renderRoute() {
    if (this.state.route === '/articles') {
      return <ArticlesPage />;
    }

    if (this.state.route === '/articles/new') {
      return <CreateArticlePage />;
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return <SingleArticlePage id={id} />;
    }

    return <HomePage />;
  }

  renderBreadcrumb() {
    if (this.state.route === '/articles') {
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
        </ol>
      );
    }

    if (this.state.route.startsWith('/articles/')) {
      const id = this.state.route.split('/articles/')[1];
      return (
        <ol className="breadcrumb">
          <li><a href="#/">Home</a></li>
          <li><a href="#/articles">Articles</a></li>
          <li><a href={`#/articles/${id}`}>{id}</a></li>
        </ol>
      );
    }

    return (
      <ol className="breadcrumb">
        <li><a href="#/">Home</a></li>
      </ol>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#/">Web Seminar - Blog</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/articles">Articles</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.renderBreadcrumb()}
            </div>
          </div>
        </div>
        {this.renderRoute()}
      </div>
    );
  }
}


export default App;
