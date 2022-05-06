import React, { useState } from "react";
import { FaPenSquare, FaTrashAlt } from "react-icons/fa";
import { Button , Card } from "react-bootstrap";
import "../styles/button.css";
import "../styles/task.css";

export const Task = ({
  provided,
  snapshot,
  item,
  handleEdit,
  colId,
  handleRemove,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(item.content);

  return (
    <Card
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        userSelect: "none",
        padding: 16,
        margin: "0 0 8px 0",
        minHeight: "130px",
        display:"inline-block",
        borderRadius: 10,
        width: "100%",
        backgroundColor: "#42a5f5",
        fillOpacity:snapshot.isDragging ? 0.1 : 1,
        color: "white",
        ...provided.draggableProps.style,
      }}
    >
      {!isEditMode ? (
        <React.Fragment>
          {item.content}
          <div className="edit-btn">
            <FaPenSquare
              size={24}
              id={item.id}
              onClick={() => setIsEditMode(true)}
            />
          </div>
          <div
            className="edit-btn"
            onClick={() => {
              handleRemove(colId, item.id);
            }}
          >
            <FaTrashAlt size={20} id={item.id} />
          </div>
        </React.Fragment>
      ) : (
        <div id={item.id}>
          <div className="input-group input-group-sm mb-3">
            <textarea
              value={taskContent}
              onChange={(e) => setTaskContent(e.target.value)}
              type="text"
              className="form-control"
            ></textarea>
          </div>

          <div className="save-button-outer">
            <Button
              className="cancle-btn"
              variant="warning"
              onClick={() => {
                setIsEditMode(false);
                setTaskContent(item.content);
              }}
            >
              cancel
            </Button>

            <Button
              className="custom-btn"
              onClick={() => {
                handleEdit(colId, item.id, taskContent);
                setIsEditMode(false);
                setTaskContent(taskContent);
              }}
            >
              update
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
