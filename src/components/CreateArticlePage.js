import 'isomorphic-fetch';
import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';


class CreateArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
    };

    this.handleTitle = this.handleTitle.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleContent = this.handleContent.bind(this);

  }

  handleTitle(event) {
    this.setState({title: event.target.value, })
  }

  handleTags(input) {
    this.setState({tags: input});
  }

  handleContent(input) {
    this.setState({content: input })
  }

  handleSubmitClick = () => {
    const confirm = window.confirm('確定要新增文章?');
    if (confirm) {
      // send POST by fetch
      fetch('/api/articles/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags,
        }),
      })
      .then( () => {
        this.setState({title: '', tags: [], content: ''})
      })
      .then( () => document.location.href= "#/articles");
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-info pull-right"
              role="button"
              onClick={this.handleSubmitClick}
            >Submit</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitle} placeholder="Title"></input>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TagsInput value={this.state.tags} onChange={this.handleTags}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
             <ReactQuill theme="snow" value={this.state.content} onChange={this.handleContent}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateArticlePage;
