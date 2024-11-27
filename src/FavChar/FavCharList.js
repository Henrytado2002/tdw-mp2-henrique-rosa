import './FavCharList.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { del, overwrite } from './listSlice';

function liStyle(index) {
  return index % 2 === 0
    ? { backgroundColor: 'rgb(212, 249, 255)' }
    : { backgroundColor: 'white' };
}

function FavCharlist() {
  const charlist = useSelector((state) => state.list?.chars || []);
  const filter_text = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();

  const [showlist, setShowList] = useState(charlist);

  function generateViewList() {
    setShowList(charlist.filter((obj) => obj.text.includes(filter_text)));
  }

  useEffect(() => {
    generateViewList();
  }, [charlist, filter_text]);

  function delete_handler(index) {
    dispatch(del(index));
  }

  function Overwrite_data() {
    dispatch(overwrite([{ text: 'one' }, { text: 'two' }, { text: 'three' }]));
  }

  function moveItem(index, direction) {
    const newList = [...charlist];
    const targetIndex = index + direction;

    // Check if the target index is within bounds
    if (targetIndex < 0 || targetIndex >= newList.length) return;

    // Swap items
    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];

    // Update the list in Redux
    dispatch(overwrite(newList));
  }

  const Button = styled.button`
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 5px 10px;
    font-size: 1.5em;
    margin: 0 5px;

    &:hover {
      background-color: #f0f0f0;
    }
  `;

  return (
    <div className="list_container">
      <button onClick={Overwrite_data}>Overwrite!</button>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {showlist.map((obj, index) => (
          <li key={index} style={liStyle(index)}>
            <div className="listitem-container" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="text" style={{ flex: 1 }}>
                {obj.text}
              </span>
              <div>
                <Button onClick={() => moveItem(index, -1)}>▲</Button>
                <Button onClick={() => moveItem(index, 1)}>▼</Button>
                <Button onClick={() => delete_handler(index)}>
                  ❌
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavCharlist;