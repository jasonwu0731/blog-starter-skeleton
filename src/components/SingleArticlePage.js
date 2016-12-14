import 'isomorphic-fetch';
import React, { Component, PropTypes } from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';

class SingleArticlePage extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      tags: [],
      isEditing: false,
    };

    this.handleTagsChange = this.handleTagsChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleDelClick = this.handleDelClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.renderTitle = this.renderTitle.bind(this);
    this.renderTags = this.renderTags.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    // fetch with id
    fetch('/api/articles/'+this.props.id)
    .then(res => res.json())
    .then(json => { 
      this.setState({ title: json.title, content: json.content, tags: json.tags, });
    });
  }

  componentDidUpdate() {
    // fetch with id
  }

  handleTagsChange = (input) => {
    this.setState({tags: input});
  };

  handleTitleChange = (event) => {
    this.setState({title: event.target.value});
  };

  handleContent = (input) => {
    this.setState({content: input })
  };

  handleDelClick = () => {
    const confirm = window.confirm('確定要刪除本篇文章?');
    if (confirm) {
      fetch('/api/articles/'+this.props.id, {
        method: 'DELETE'
      }).then( document.location.href = "#/articles");
    }
  };

  handleEditClick = () => {
    if(this.state.isEditing){
      this.setState({isEditing: false});
      fetch('/api/articles/'+this.props.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          tags: this.state.tags,
        }),
      }); 
    }
    else {
      this.setState({isEditing: true, });
    }
  };

  renderTitle = () => {
    if(this.state.isEditing){
      return <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange}></input>;
    }
    else {
      return <h1>{this.state.title}</h1>;
    }
  };

  renderTags = () => {
    if(this.state.isEditing){
      return <TagsInput value={this.state.tags} onChange={this.handleTagsChange}/>;
    }
    else {
      return <div>
        {this.state.tags.map((tag,index) => <button key={index + 1}
          type="button">#{tag}</button>)}
      </div>;
    }
  };

  renderContent = () => {
    if(this.state.isEditing){
      return <ReactQuill theme="snow" value={this.state.content} onChange={this.handleContent}/>;
    }
    else {
      return <div className="jumbotron" dangerouslySetInnerHTML={{__html: this.state.content}}/>;
    }
  };

  render() {
    const { isEditing } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="page-header">
              {this.renderTitle()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {this.renderTags()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {this.renderContent()}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-info"
              role="button"
              onClick={this.handleEditClick}
            >{isEditing ? 'Submit' : 'Edit'}</button>
            {isEditing ? null :
            <button
              className="btn btn-warning"
              role="button"
              onClick={this.handleDelClick}
            >Delete</button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default SingleArticlePage;
