import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { Task } from "./task.js";
import { PopModal } from "./popmodal.js";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import "../styles/button.css";

const itemsFromBackend = [
  { id: uuid(), content: "First Matrices" },
  { id: uuid(), content: "Second Matrices" },
  { id: uuid(), content: "Third Matrices" },
  { id: uuid(), content: "Fourth Matrices" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Q1",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "Q2",
    items: [],
  },
  [uuid()]: {
    name: "Q3",
    items: [],
  },
  [uuid()]: {
    name: "Q4",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Kanban() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [modalShow, setModalShow] = useState(false);
  const [colId, setColId] = useState(null);

  // for add task
  /**
   * This function is used for creating a new task
   *
   * @param taskContent - New Value
   */
  const createNewItem = (taskContent) => {
    const newObj = {
      ...columns,
      [colId]: {
        ...columns[colId],
        items: columns[colId].items.concat({
          id: uuid(),
          content: taskContent,
        }),
      },
    };

    setColumns(newObj);
    setModalShow(false);
  };

  //for edit task
  /**
   * This function is used for updating a current task value
   *
   * @param colId - selected col Id
   * @param taskId - selected task Id
   * @param updatedContent - Updated value
   */
  const handleEdit = (colId, taskId, updatedContent) => {
    const newObj = {
      ...columns,
      [colId]: {
        ...columns[colId],
        items: columns[colId].items.map((item) => {
          if (taskId === item.id) {
            return {
              ...item,
              content: updatedContent,
            };
          }
          return item;
        }),
      },
    };
    setColumns(newObj);
  };

  //for remove task
  /**
   * This function is used to remove the item
   *
   * @param colId - selected col Id
   * @param taskId - selected task Id
   */
  const handleRemove = (colId, taskId) => {
    const newObj = {
      ...columns,
      [colId]: {
        ...columns[colId],
        items: columns[colId].items.filter(({ id }) => id !== taskId),
      },
    };

    setColumns(newObj);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: 50,
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: "#F4F4F4",
                          padding: 4,
                          borderRadius: 10,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <>
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <Task
                                      provided={provided}
                                      snapshot={snapshot}
                                      item={item}
                                      handleEdit={handleEdit}
                                      colId={columnId}
                                      handleRemove={handleRemove}
                                    />
                                  );
                                }}
                              </Draggable>
                            </>
                          );
                        })}
                        {provided.placeholder}
                        <div className="save-btn-outer">
                          <Button
                            className="save-btn"
                            variant="primary"
                            onClick={() => {
                              setModalShow(true);
                              setColId(columnId);
                            }}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>

      <PopModal
        show={modalShow}
        createNewItem={createNewItem}
        setModalShow={setModalShow}
      />
    </div>
  );
}

export default Kanban;
