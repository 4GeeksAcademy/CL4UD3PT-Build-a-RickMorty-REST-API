import React, {useContext, useEffect} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

export const Home = () => {
	const {store, actions} = useContext(Context);

	// TODO: maybe there's a workaround to assign store.character to dataFiltered without useEffect()
	useEffect(()=>{
		actions.setDataFiltered(store.character)
		store.schema = "character"
	}, [store.character]);

	return(
		<div className="container">
			<div className="row d-flex"> 
				{store.dataFiltered.length > 0
				?store.dataFiltered.map((element)=>{
					return <Card key={element.id} data={element}/>
				})
				:<h3>Loading data... or not!</h3>}
			</div>
		</div>
	)
};