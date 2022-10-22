import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    } else {
      axios
        .get("http://localhost:3001/posts", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              return like.PostId;
            })
          );
        });
    }
  }, []);

  const likeAPost = (PostId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: PostId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === PostId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(PostId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== PostId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, PostId]);
        }
      });
  };

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="post"
            onClick={() => {
              // use history instead of history.push
              history(`/post/${value.id}`);
            }}
          >
            {/* title = name, body = rating footer = cast = genre = date */}
            <div className="name"> Movie Name: {value.name} </div>
            <div className="name">Rating: {value.rating}</div>
            <div className="name">Cast: {value.cast}</div>
            <div className="name">Genre: {value.genre}</div>
            <div className="name">Release date:{value.date}</div>
            <div className="footer">
              <div className="username">{value.name}</div>
              <div className="buttons">
                <ThumbUpAltIcon
                  onClick={() => {
                    likeAPost(value.id);
                  }}
                  className={
                    likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                  }
                />
                <label>{value.Likes.length}</label>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
