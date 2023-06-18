import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Board = () => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const title = params.get("title");
    setTitle(title);
    console.log(title);
    // Use the title value as needed
  }, []);

  const [posts, setPosts] = useState([]);
  const [newPostSubj, setNewPostSubj] = useState("");
  const [newPostImg, setNewPostImg] = useState("");
  const [newPostCont, setNewPostCont] = useState("");
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  useEffect(()=>{
    console.log(newPostSubj);
  }, [newPostSubj])

   useEffect(() => {
     console.log(newPostImg);
   }, [newPostImg]);

    useEffect(() => {
      console.log(newPostCont);
    }, [newPostCont]);

    function fileToBlob(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    }


  const handleCreatePost = (e) => {
 e.preventDefault();
    if(!newPostSubj.length || !newPostCont.length || !newPostCont.length) {
      alert("fields are empty");
      return;
    }
    fileToBlob(newPostImg).then((blob)=>{

 const newPost = {
   parentt: title,
   id: Date.now(),
   subject: newPostSubj,
   image: blob,
   content: newPostCont,
   liked: false,
 };

 console.log(newPost);

 const updatedPosts = [...posts, newPost];
 setPosts(updatedPosts);
 localStorage.setItem("posts", JSON.stringify(updatedPosts));
 setModal(false);
 setNewPostSubj("");
 setNewPostCont("");
 setNewPostImg("");
 setNewPostSubj("");
    })

  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.removeItem("posts");
    localStorage.setItem("posts", JSON.stringify(updatedPosts))
  };
  const handleLikePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, liked: !post.liked };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  const [modal, setModal] = useState(false);

  return (
    <>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Create a Post
          <p className="desc">write something for your post</p>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleCreatePost}>
            <div class="form-group">
              <fieldset disabled="">
                <label class="form-label" for="disabledInput">
                  Subject
                </label>
                <input
                  class="form-control"
                  id="disabledInput"
                  type="text"
                  placeholder="Subject..."
                  disabled=""
                  value={newPostSubj}
                  onChange={(e) => setNewPostSubj(e.target.value)}
                />
              </fieldset>
            </div>
            <div class="form-group my-2">
              <fieldset disabled="">
                <input
                  class="form-control"
                  type="file"
                  disabled=""
                  id="formFile"
                  // value={newPostImg}
                  onChange={(e) => {
                    const { files } = e.target;
                    console.log(files[0]);
                    setNewPostImg(files[0]);
                  }}
                />
              </fieldset>
            </div>
            <div class="form-group">
              <fieldset disabled="">
                <label class="form-label" for="disabledInput">
                  Whats on Your mind ?
                </label>
                <input
                  class="form-control"
                  id="disabledInput"
                  type="text"
                  placeholder="Type Here..."
                  disabled=""
                  value={newPostCont}
                  onChange={(e) => setNewPostCont(e.target.value)}
                />
              </fieldset>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">
                Publish
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <header>
        <div className="my_board_nav">
          <div className="my_board_back">
            <a href="/">
              <i class="fa-solid fa-arrow-left"></i>
            </a>
          </div>
          <div className="my_board_logo">
            <img src="logo2.jpg" alt="logo" className="logo" />
          </div>
          <div className="my_board_title">
            <p>{title}</p>
          </div>
          <div className="my_board_icon">
            <i class="fa-solid fa-magnifying-glass"></i>
            <b>|</b>
            <i class="fa-regular fa-bookmark"></i>
          </div>
        </div>
      </header>
      <div className="my_board_screen">
        <div className="my_board_screen_title">
          <h1>Your Posts</h1>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => setModal(true)}
          >
            <b> +Create Post</b>
          </button>
        </div>

        <div className="allPosts">
          {posts.filter((post) => post.parentt === title).length ? (
            posts
              .filter((post) => post.parentt === title)
              .map((posts) => (
                <div key={posts.id}>
                  <div class="postCard" style={{ width: "18rem" }}>
                    {/* <img
                className="card-img-top"
                src={posts.image}
                alt="Card image cap"
                onError={(e) => {

                }}
              /> */}
                    <img className="card-img-top" src={posts.image} alt="" />
                    <div class="card-body">
                      <h5 class="card-title">{posts.subject}</h5>
                      <p class="card-text">{posts.content}</p>
                      <a href="/" class="btn btn-primary">
                        Back
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(posts.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="my_board_screen_content">
              <div className="my_board_screen_img">
                <img
                  src="NoPostMobile.jpg"
                  alt="logo"
                  style={{ width: "300px", height: "300px" }}
                />
              </div>
              <h2 className="text-center">Nothing is here yet</h2>
              <p className="text-center">
                create your first post by clicking the "<b>+Create Post</b>"
                button
              </p>
            </div>
          )}
        </div>
      </div>

      {/* <Post_temp /> */}
    </>
  );
};

export default Board;
