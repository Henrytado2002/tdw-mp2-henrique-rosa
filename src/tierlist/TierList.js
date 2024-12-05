import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { overwrite_for_tier } from "../FavChar/listSlice";
import Navbar from "../NavBar/NavBar";
import "./TierList.css";





const TierList = () => {

  //initializing data to use on page
  const dispatch = useDispatch();

  
  
  const Items = useSelector((state)=>state.list?.charsForTierList || [])

  const initialData = {
    tiers: {
      S: [],
      A: [],
      B: [],
      C: [],
      F: [],      
      "": Items,
    },
  };

  const [tiers, setTiers] = useState(initialData.tiers);

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // If no destination, return early
    if (!destination) return;

    // If dragged within the same tier
    if (source.droppableId === destination.droppableId) {
      const items = Array.from(tiers[source.droppableId]);
      const [movedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, movedItem);

      setTiers((prev) => ({ ...prev, [source.droppableId]: items }));
    } else {
      // Moving items between tiers
      const sourceItems = Array.from(tiers[source.droppableId]);
      const destinationItems = Array.from(tiers[destination.droppableId]);

      const [movedItem] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, movedItem);

      setTiers((prev) => ({
        ...prev,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Navbar/>
      <div className="tier-list">
        {Object.keys(tiers).map((tier) => (
          <div className="tier" key={tier}>
            <h3>{tier}</h3>
            <Droppable droppableId={tier} direction="horizontal">
              {(provided) => (
                <div
                  className="tier-items"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {tiers[tier].map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          className="tier-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img
                            src={item.image}
                            alt={item.name || "tier item"}
                            className="tier-item-image"
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
        
      </div>
      
    </DragDropContext>
  );
};

export default TierList;
