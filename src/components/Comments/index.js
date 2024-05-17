import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentList: [],
  }

  deleteComment = commentId => {
    const {commentList} = this.state
    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleISLiked = id => {
    const {commentList} = this.state
    this.setState(prevState =>
      prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    )
  }

  onEnterYourName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  onEnterYourComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  addComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBgClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: v4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBgClassName,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      comment: '',
    }))
  }
  renderCommentList = () => {
    const {commentList} = this.state
    return commentList.map(eachComment => (
      <CommentItem
        commentDetails={eachComment}
        key={eachComment.id}
        deleteComment={this.deleteComment}
        toggleISLiked={this.toggleISLiked}
      />
    ))
  }
  render() {
    const {name, comment, commentList} = this.state
    return (
      <div className="container">
        <h1 className="heading">Comments</h1>
        <div className="card-container">
          <div className="formContainer">
            <p className="content-heading">
              Say something About 4.o Technologies
            </p>
            <form onSubmit={this.addComment} className="form">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={this.onEnterYourName}
              />
              <textArea
                type="text"
                placeholder="Your Comment"
                onChange={this.onEnterYourComment}
                value={comment}
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <div className="imageContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr className="line" />
        <p className="heading">
          <span className="commentCount">{commentList.length}</span>
          Comments
        </p>
        <ul className="commentsContainer">{this.renderCommentList()}</ul>
      </div>
    )
  }
}
export default Comments
