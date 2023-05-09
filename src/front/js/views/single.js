import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { capitalizeFirst } from "../utils/myUtils";

export const Single = () => {
	const { store } = useContext(Context);
	const params = useParams();
	const [ item, setItem ] = useState({});

	useEffect(() =>{
		getSingleData();
	}, [])

	useEffect(()=>{
		console.log("New item is: ", item);
	}, [item])

	const getSingleData = async () => {
		const response = await fetch(process.env.BACKEND_URL + "api/" + params.thetype + "/" + params.theid);
		const data = await response.json();
		setItem(data);
		console.log(data)
	}
	return (
		<div className="container pb-5">
			<div className="card col-10 col-sm-7 col-md-10 col-lg-8 mx-auto mb-3 rounded-0 rounded-bottom">
				<div className="row d-flex flex-column flex-md-row g-0">
						{item.image
							?<div className="col-12 col-md-5 col-lg-4 text-center text-md-start bg-light">
								<img src={item.image} className="img-fluid h-100 rounded-start-2" alt="..."/>
							</div>
							: null}
					<div className={` col-12 ${item.image ? " col-md-7 col-lg-8" : null }`}>
						<h4 className="card-header">{item.name}</h4>
						<div className="card-body">
							{Object.keys(item).map((itemKey, index)=>{
								if(typeof item[itemKey] != "object" && itemKey != "id" && itemKey != "name" && itemKey != "image" && itemKey != "url"){
									return <p key={index} className="card-text mb-2"><strong>{itemKey}:</strong> {item[itemKey]}</p>
								}
							})}							 
						</div>
					</div>
				</div>
				<div className="card-footer d-md-flex justify-content-between align-items-center">
					<figure>
						<blockquote className="blockquote mb-2">
							<p>{capitalizeFirst(store.schema)}</p>
						</blockquote>
						<figcaption className="blockquote-footer mb-0">
							Rick & Morty BlogWars <cite title="Source Title">"Get Schwifty"</cite>
						</figcaption>
					</figure>

					<Link to={"/"}>
						<button className="btn btn-sm btn-primary d-flex mx-auto mx-md-0">Go to home</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
