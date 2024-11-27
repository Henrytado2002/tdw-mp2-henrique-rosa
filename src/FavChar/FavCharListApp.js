import FavCharlist from "./FavCharList";

import FavCharFilter from "./FavCharListFilter";
import Navbar from '../NavBar/NavBar';

import {change, filterSlice} from './filterSlice'

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import './FavCharListApp.css'

function FavCharListApp() {
	
	const filter_text = useSelector((state)=>state.filter.value);

	var JSONstr= localStorage.getItem("list");

	const [list, setList] = useState((	JSONstr=="[]")? 
										[]:
										JSON.parse(JSONstr));

	const [showList, setShowList] = useState(list);

	function removeTask(index){
		setList(list.filter((_,i)=> index!=i ));
	}


	

	
	return (
		<>
			<Navbar/>
			<div className="app_container">
				<FavCharFilter/>
				<FavCharlist  />
			</div>
		</>
	);
}

export default FavCharListApp;
