// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button active' : 'button'
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleISLiked} = props
    toggleISLiked(id)
  }
  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comments">
      <div className="commentContainer">
        <p className={initialClassName}>{initial}</p>
        <p className="name">{name}</p>
        <p className="postedTime">{postedTime}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="liked-container">
        <img src={likeImgUrl} alt="like" />
        <button
          className={likeTextClassName}
          type="button"
          onClick={onClickLike}
        >
          Like
        </button>
        <div className="delete-container">
          <button
            className="delete"
            onClick={onDeleteComment}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default CommentItem
