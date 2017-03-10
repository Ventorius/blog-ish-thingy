import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import {createPost} from '../actions/index';
import {Link, browserHistory} from 'react-router'


const renderField = ({input, label, type, meta: {touched, error}}) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} className='form-control'/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
);

const renderTextArea = ({input, label, type, meta: {touched, error}}) => (
  <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} type={type} className='form-control'/>
      {touched && ((error && <span>{error}</span>))}
    </div>
  </div>
);


class PostsNew extends Component {

  onSubmit(props) {
    this.props.createPost(props).then(() => {
      browserHistory.push('/');
    })
  }
  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title" name="title" type='text' component={renderField}/>
        <Field label="Categories" name="categories" type='text' component={renderField}/>
        <Field label="Content" name="content" component={renderTextArea} className='form-control'/>
        <button type="submit" className='btn btn-primary'>Submit</button>
        <Link to='/' className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category';
  }

  if (!values.content) {
    errors.content = 'Write some content';
  }

  return errors;
}


export default connect(null, {createPost})(reduxForm({
  form: 'PostsNew',
  validate
})(PostsNew));