import FavCharlist from "./FavCharList";

import FavCharFilter from "./FavCharListFilter";
import Navbar from '../NavBar/NavBar';

import { useDispatch } from "react-redux";
import { overwrite, overwrite_for_tier } from "./listSlice";

import './FavCharListApp.css'

function FavCharListApp() {

	const dispatch = useDispatch();
	
	var JSONstr = localStorage.getItem("list");
	 console.log(JSON.parse(JSONstr), JSONstr!== null)
	if(JSONstr!== null &&  JSONstr!== "[]"){
		dispatch(overwrite(JSON.parse(JSONstr)))
	}

	var JSONstr2 = localStorage.getItem("tierlist");
	 console.log(JSON.parse(JSONstr2), JSONstr2!== null)
	if(JSONstr2!== null &&  JSONstr2!== "[]"){
		dispatch(overwrite_for_tier(JSON.parse(JSONstr2)))
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
