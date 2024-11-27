import './FavCharList.css'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { add, del , overwrite } from './listSlice'
import {change, filterSlice} from './filterSlice'
import { useRef } from 'react'

function liStyle(index){
    if(index%2===0){
        return {backgroundColor: 'rgb(212, 249, 255)'}
    }else{
        return {backgroundColor: 'white'}
    }    
}

function FavCharlist(){

    const charlist = useSelector((state) => state.list.chars) || [];
    const filter_text = useSelector((state) => state.filter.value);
    const dispatch=useDispatch()

    const [showlist, setShowList] = useState(charlist)

    function generateViewList() {
        setShowList(charlist.filter((obj)=> obj.text.includes(filter_text)))
    }
    
	useEffect(() => {
        console.log("charlist:", charlist);
        console.log("filter_text:", filter_text);
        generateViewList()
    }, [charlist, filter_text]);

    function Overwrite_data(){
        dispatch(overwrite([{text:"one"},{text:"two"},{text:"three"}]))
        console.log(charlist)
    }

    return(
        <>
            <div className='list_container'>
                <button onClick={Overwrite_data}>overwrite!</button>
                <ul >
                    {showlist.map((obj,index)=> <li key={index} style={liStyle(index)}>
                                                <div className='listitem-container'>
                                                    <span className='text'> {obj.text} </span> 
                                                    <button style={liStyle(index)} className='list_delete_button' > ❌ </button>
                                                </div>
                                            </li>)}
                </ul>
            </div>
        </>
    );
}

export default FavCharlist;