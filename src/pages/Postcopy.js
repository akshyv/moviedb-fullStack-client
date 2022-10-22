import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://moviedb-fullstack-api-akshy.herokuapp.com/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
      });
    axios
      .get(`https://moviedb-fullstack-api-akshy.herokuapp.com/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, []);
  const addComment = () => {
    axios
      .post("https://moviedb-fullstack-api-akshy.herokuapp.com/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };
  return (
    <div>
      <div className="leftside">
        <div className="name"> Movie Name: {postObject.name} </div>
        <div className="name">Rating: {postObject.rating}</div>
        <div className="name">Cast: {postObject.cast}</div>
        <div className="name">Genre: {postObject.genre}</div>
        <div className="name">Release date:{postObject.date}</div>
      </div>
      <div className="rightside">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment Here"
            autocomplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
