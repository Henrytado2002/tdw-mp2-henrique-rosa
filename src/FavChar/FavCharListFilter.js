import { useEffect, useState, useRef } from "react";
import './FavCharListFilter.css'
import { useSelector, useDispatch } from 'react-redux'
import {change, filterSlice} from './filterSlice'

function FavCharFilter(){
    
    var filter_text = useRef();
    const dispatch = useDispatch();
    const text = useSelector((state) => state.filter.value);

    function filter_text_handler(){
        dispatch(change(filter_text.current.value))
    }

    return(
        <>
        <div>
            <input className='filter_name_text_input' ref={filter_text} onChange={()=>{filter_text_handler()}}  placeholder='search by name'></input>
            <button className="filter_delete_button" 
                    onClick={()=>{
                        filter_text.current.value="";
                        filter_text_handler();                                       
                    }}>❌</button>
        </div>
        </>
    );
}

export default FavCharFilter;