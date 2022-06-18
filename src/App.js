import styles from "./App.module.css";
import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [editValue, setEditValue] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo == "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleDeleteTodo = (index) => {
    let temp = [];
    for (let i = 0; i < todos.length; i++) {
      if (i != index) {
        temp.push(todos[i]);
      }
    }
    setTodos(temp);
  };

  const handleEditTodo = (index) => {
    handleShow();
    setEditIndex(index);
  };

  const handleEdit = () => {
    let temp = todos;
    temp[editIndex] = editValue;
    setTodos(temp);
    handleClose();
  };

  const handleClose = () => setEdit(false);
  const handleShow = () => setEdit(true);

  return (
    <React.Fragment>
      <div>
        <Navbar/>
      </div>
      <h1 style={{ textShadowColor: 'rgba(0, 0, 0, 0.75)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 10 , textAlign: "center", marginTop: "50px" }}>ToDo List</h1>
      <div>
        <Form
          onSubmit={handleAddTodo}
          style={{ width: "60%", margin: "auto", marginTop: "20px" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Add task below</Form.Label>
            <Form.Control
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter Todo"
            />
            <div style={{ textAlign: "center", margin: "15px" }}>
              <Button variant="primary" type="submit">
                Add Task
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="content" style={{ padding: "50px", margin: "0% 17% 0% 17%"}}>
        {todos.map((t, index) => {
          return (
            <div id={index} key={`Todo_${index}`} className={styles.Todo}>
              <p style={{ margin: "5px" }}>{t}</p>
              <div>
                <Button onClick={() => handleEditTodo(index)} variant="outline-warning" style={{border: '2px solid #ffc107'}} >
                  Update
                </Button>{'  '}
                <Button onClick={() => handleDeleteTodo(index)} variant="outline-danger" style={{border: '2px solid #df4759'}} >
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal show={edit} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p>Todo: {todos[editIndex]}</p>
            <Form.Control
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Edit Todo"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export const variable = "Hello World";