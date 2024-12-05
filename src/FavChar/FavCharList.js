import './FavCharList.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { del, overwrite } from './listSlice';

function liStyle(index) {
  return index % 2 === 0
    ? { backgroundColor: 'rgb(99, 195, 99)',  }
    : { backgroundColor: ' rgb(87, 124, 87)', };
}

function FavCharlist() {
  const charlist = useSelector((state) => state.list?.chars || []);
  const filter_text = useSelector((state) => state.filter.value || '');
  const dispatch = useDispatch();

  const [showlist, setShowList] = useState([]);

  function generateViewList() {
    const filtered = charlist.filter((char) => char.name?.includes(filter_text));
    setShowList(filtered);
    console.log('Filtered list:', filtered);
  }

  useEffect(() => {
    console.log('charlist:', charlist);
    console.log('filter_text:', filter_text);
    generateViewList();
  }, [charlist, filter_text]);

  useEffect(() => {
    getSecondTitle();
    console.log(secondTitle);
  }, [showlist]);

  function delete_handler(index) {
    dispatch(del(index));
  }

  function getSecondTitle(){
    if(showlist.length==0){
      secondTitle = "Nothing to show..."
    }else{
      secondTitle =  ""
    }
  }
  
  var secondTitle = ""

  function moveItem(index, direction) {
    const newList = [...charlist];
    const targetIndex = index + direction;

    if (targetIndex < 0 || targetIndex >= newList.length) return;

    [newList[index], newList[targetIndex]] = [newList[targetIndex], newList[index]];
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
      <h1 className='FavCharTitle'>Your Favorite Characters</h1>
      <h3 classname="FavCharSecondTitle">{secondTitle}</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {showlist.map((char, index) => (
          <li key={index} style={liStyle(index)}>
            <div className="listitem-container" style={{ display: 'flex', alignItems: 'center' }}>
              <span className="favlist_char_name" style={{ flex: 1 }}>
                {char.name || 'Unnamed Character'}
              </span>
              <div>
                <Button onClick={() => moveItem(index, -1)}>▲</Button>
                <Button onClick={() => moveItem(index, 1)}>▼</Button>
                <Button onClick={() => delete_handler(index)}>❌</Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavCharlist;