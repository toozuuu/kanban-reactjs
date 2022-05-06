import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import "../styles/button.css";

export const PopModal = ({ show, createNewItem, setModalShow }) => {
  const [taskContent, setTaskContent] = useState("");

  return (
    <Modal show={show} size="md" centered onHide={() => setModalShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="input-group input-group-sm mb-3">
          <textarea
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            type="text"
            className="form-control"
            style={{ height: 150 }}
          ></textarea>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <>
          <Button variant="warning" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button
            className="custom-btn"
            onClick={() => {
              setTaskContent("");
              createNewItem(taskContent);
            }}
          >
            Save
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  );
};
