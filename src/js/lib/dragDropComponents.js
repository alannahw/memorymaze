import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export const Drag = props => {
  return (
    <Draggable draggableId={props.dragId} index={props.index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.children}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};
export const Drop = props => {
  return (
    <Droppable droppableId={props.dropId} type={props.type}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} style={props.style}>
          {props.children}
        </div>
      )}
    </Droppable>
  );
};
