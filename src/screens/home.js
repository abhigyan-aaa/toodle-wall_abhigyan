import React, { useState, useEffect } from "react";
import Board_temp from "../components/Board_temp";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Board = ({board}) => {
          const [menuDropDwown, setMenuDropDown] = useState(false);

          return (
            <div className="board">
              <div className="board_left"></div>
              <a href={`/board?title=${encodeURIComponent(board.title)}`}>
                <div className="board_right">{board.title}</div>
              </a>

              <div className="relative">
                {/* <button  onClick={() => handleDeleteBoard(board.id)}>
              </button> */}
                <i
                  className="fa-solid fa-ellipsis-vertical"
                  onClick={() => {
                    setMenuDropDown((prev) => !prev);
                  }}
                ></i>
                  {menuDropDwown && (
                    <div>
                      <div>edit</div>
                      <div>Delete</div>
                    </div>
                  )}
              </div>
            </div>
          );
        }

const Home = () => {
  const [modal, setModal] = useState(false);
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("");
  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards")) || [];
    setBoards(storedBoards);
  }, []);

  const handleCreateBoard = (e) => {
    e.preventDefault();

    const newBoard = {
      id: Date.now(),
      title: newBoardTitle,
      color: newBoardColor,
      posts: [],
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
    console.log(JSON.stringify(updatedBoards));
    setModal(false);
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (boardId) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);
    setBoards(updatedBoards);
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  return (
    <>
      <Modal size="lg" isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Add Name For Your Board
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleCreateBoard} className="form">
            <div class="form-group">
              <fieldset disabled="">
                <input
                  class="form-control"
                  id="disabledInput"
                  type="text"
                  placeholder="title..."
                  disabled=""
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                />
              </fieldset>
            </div>

            <div
              class="card my-3"
              value={newBoardColor}
              onChange={(e) => setNewBoardColor(e.target.value)}
            >
              <h4 className="mx-2"> Select Your Colour </h4>
              <p className="mx-2">
                Here are some templets to help you get stearted
              </p>

              <ul>
                <li class="color-item" id="red">
                  <input type="radio" name="color" value={"red"} />
                </li>
                <li class="color-item" id="green">
                  <input type="radio" name="color" value={"green"} />
                </li>
                <li class="color-item" id="amber">
                  <input type="radio" name="color" value={"amber"} />
                </li>
                <li class="color-item" id="blue">
                  <input type="radio" name="color" value={"blue"} />
                </li>
                <li class="color-item" id="gray">
                  <input type="radio" name="color" value={"gray"} />
                </li>
              </ul>
            </div>

            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-danger"
                onClick={() => setModal(true)}
              >
                Create Board
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>

      <header>
        <nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <img src="logo.jpg" alt="logo" className="logo" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor03"
              aria-controls="navbarColor03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarColor03">
              <ul class="navbar-nav me-auto"></ul>
              <form class="d-flex">
                <input
                  class="form-control me-sm-2"
                  type="search"
                  placeholder="Search"
                />
              </form>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => setModal(true)}
              >
                <b>+Create new board</b>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <h1>My Boards</h1>

      <div className="boards">
        {boards.map((board) => (
          <Board key={board.id} board={board}/>
        ))}
      </div>
    </>
  );
};

export default Home;
