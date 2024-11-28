import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./TierList.css"; // Optional for styling
import Navbar from "../NavBar/NavBar";



const Items = [
  { id: "1", name: "Character 1" },
  { id: "2", name: "Character 2" },
  { id: "3", name: "Character 3" },
  { id: "4", name: "Character 4" },
  { id: "5", name: "Character 5" },
];

const initialTiers = {
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  F: [],
  Pool: Items,
};

function TierList() {
  const [tiers, setTiers] = useState(initialTiers);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside a valid drop zone, return early
    if (!destination) return;

    // If dropped in the same place, return early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceTier = tiers[source.droppableId];
    const destinationTier = tiers[destination.droppableId];

    // Create a copy of the source and destination arrays
    const sourceItems = Array.from(sourceTier);
    const destinationItems = Array.from(destinationTier);

    // Remove the item from the source array
    const [movedItem] = sourceItems.splice(source.index, 1);

    // Add the item to the destination array
    destinationItems.splice(destination.index, 0, movedItem);

    // Update the tiers state
    setTiers({
      ...tiers,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
        <Navbar></Navbar>
      <div className="tier-list">
        {Object.keys(tiers).map((tier) => (
          <Droppable key={tier} droppableId={tier}>
            {(provided) => (
              <div
                className="tier"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <h3 className="tier-title">{tier}</h3>
                {tiers[tier].map((item, index) => (
                  <Draggable
                    key={item.id} // Ensure the key is the item's unique ID
                    draggableId={item.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="tier-item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default TierList;