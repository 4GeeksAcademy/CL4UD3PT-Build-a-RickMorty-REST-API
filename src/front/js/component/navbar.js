import React, {useContext, useState} from "react";
import { Context } from "../store/appContext";
import { Link, useLocation } from "react-router-dom";
import schwifty from "../../img/get-schwifty.png";

export const Navbar = () => {
	const {store, actions} = useContext(Context);
	const [search, setSearch] = useState("")
	const [suggestionsData, setSuggestionsData] = useState([]);
	const [suggestionClicked, setSuggestionClicked] = useState(false);
	const [searchSuggestionsOn, setSearchSuggestionsOn] = useState(true);
	const location = useLocation();

	const handleSearchString = (searchString) => {
		let find = store[store.schema].filter((char) => char.name.toLowerCase().includes(searchString.toLowerCase()));
		searchString.length == 0 ? setSuggestionsData('') : setSuggestionsData(find);
		actions.setDataFiltered(find);
	}

	const handleClickedSuggestion = (suggestion) => {
		setSuggestionClicked(true);
		setSearch(suggestion);
		handleSearchString(suggestion);
	}
	
	return (
		<header className="p-3 mb-3 border-bottom">
		    <div className="container">
      			<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
					{/* LOGO */}
					<Link className="link-logo d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none" to="/">
							<img className="logo" src={schwifty} alt="..."/>
					</Link>

					{/* TITLE */}
					<h3 className="main-title nav col-12 h-100 col-lg-auto me-lg-auto mb-2 justify-content-center mb-lg-0 ps-0 ps-lg-1">Rick & Morty BlogWars</h3>

					{/* MENU */}
					{!location.pathname.includes('single')
						?<ul className="nav col-12 h-100 col-lg-auto me-lg-auto mb-2 justify-content-center mb-lg-0">
							<li><span className={`cursor-pointer nav-link pb-0 px-2 border-primary fw-bold ${store.schema === "character" ? "link-dark border-bottom" : "link-secondary"}`} onClick={() => {actions.setDataFiltered(store.character); actions.setSchema('character')}}>Characters</span></li>
							<li><span className={`cursor-pointer nav-link pb-0 px-2 border-primary fw-bold ${store.schema === "location" ? "link-dark border-bottom" : "link-secondary"}`} onClick={() => {actions.setDataFiltered(store.location); actions.setSchema('location')}}>Locations</span></li>
							<li><span className={`cursor-pointer nav-link pb-0 px-2 border-primary fw-bold ${store.schema === "episode" ? "link-dark border-bottom" : "link-secondary"}`} onClick={() => {actions.setDataFiltered(store.episode); actions.setSchema('episode')}}>Episodes</span></li>
						</ul>
						:null
					}
					
					{/* FAVORITES */}
					{!location.pathname.includes('single')
						?<div className="btn-group mb-3 mb-lg-0">
							<button type="button" className="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
								Favorites <span className="badge my-badge text-bg-warning">{store.favorites.length}</span>
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								{store.favorites.length > 0
									?<>{store.favorites.map((fav)=>{
										return <li key={fav} className="dropdown-item px-1 d-flex justify-content-between align-items-center" >{fav}
										<button className="btn btn-warning ms-2 badge"
											onClick={()=>{actions.setFavorites(fav)}}>X</button>
										</li>
									})}</>
									: <li className="dropdown-item">Add a favorite</li>
								}
							</ul>
						</div>
						:null
					}

					{/* AUTO-SEARCH */}
					{!location.pathname.includes('single')
						?<div className="input-group auto-search-container col-12 col-lg-3 mb-3 mb-lg-0">
							<input type="text" className="form-control" onChange={(e)=>{setSearch(e.target.value)}} onKeyUp={(e)=>{suggestionClicked?setSuggestionClicked(false):null;handleSearchString(search)}} value={search} placeholder="Search..." aria-label="Search"></input>
							<button type="button" className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
								<span className="visually-hidden">Toggle Dropdown</span>
							</button>
							<ul className="dropdown-menu dropdown-menu-end">
								<li className="dropdown-item">
									<input className="form-check-input me-2" onChange={()=>setSearchSuggestionsOn(!searchSuggestionsOn)} type="checkbox" value="" id="flexCheckDefault" checked={searchSuggestionsOn}/>
									<label className="form-check-label" htmlFor="flexCheckDefault">Turn on Suggestions</label>
								</li>
							</ul>
							{suggestionsData.length > 0 && searchSuggestionsOn && !suggestionClicked
								?<div className="dropdown-auto-search rounded shadow">
									{suggestionsData.map((item) => <div key={item.id} className="dropdown-item p-1" onClick={()=>handleClickedSuggestion(item.name)}>{item.name}</div>)}
								</div>
								:null
							}
						</div>
						:null
					}
		     	</div>
    		</div>
  		</header>
	);
};
