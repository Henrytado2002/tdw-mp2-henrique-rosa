import FavCharlist from "./FavCharList";

import FavCharFilter from "./FavCharListFilter";
import Navbar from '../NavBar/NavBar';

import { useDispatch } from "react-redux";
import { overwrite, overwrite_for_tier } from "./listSlice";

import './FavCharListApp.css'
import { useEffect } from "react";

function FavCharListApp() {

	const dispatch = useDispatch();
	
	useEffect(()=>{
		var JSONstr = localStorage.getItem("list");
	 	console.log(JSON.parse(JSONstr), JSONstr!== null)
		if(JSONstr!== null &&  JSONstr!== "[]"){
		dispatch(overwrite(JSON.parse(JSONstr)))
	}
	},[])
	
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
