		{/* <nav className="navbar navbar-light bg-light mb-3 p-2">
			<div className="container"> */}
				{/* LOGO */}
				{/* <Link className="link-logo" to="/">
					<div className="d-flex align-items-center">
						<img className="logo" src={schwifty} alt="..."/>
						<h1 className="fs-2">Rick & Morty BlogWars</h1>
					</div>
				</Link> */}

				{/* SEARCH */}
				{/* <div className="auto-search-container">
					<div className="auto-search">
						<input type="text" onChange={(e)=>{setSearch(e.target.value)}} onKeyUp={(e)=>{handleSearchString(search)}} value={search}></input>
					</div>
					{autoComplete.length > 0
						?<div className="dropdown-auto-search">
							{autoComplete.map((item) => <div key={item.id} className="dropdown-item">{item.name}</div>)}
						</div>
						:null
					}
				</div> */}

				{/* FAVORITES */}
				{/* <div className="btn-group">
					<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
						Favorites <span className="badge text-bg-warning">{store.favorites.length}</span>
					</button>
					<ul className="dropdown-menu dropdown-menu-end">
						{store.favorites.length > 0
							?<>{store.favorites.map((fav)=>{
								return <li key={fav} className="dropdown-item d-flex justify-content-between align-items-center" >{fav}
								<button className="btn badge text-bg-warning"
									onClick={()=>{actions.setFavorites(fav)}}>X</button>
								</li>
							})}</>
							: <li className="dropdown-item">Add a favorite</li>
						}
					</ul>
				</div> */}
			{/* </div>
		</nav> */}






		<nav className="navbar navbar-light bg-light fixed-top mb-3 p-2">
		<div className="container">
			<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
				{/* LOGO */}
				<Link className="link-logo d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none" to="/">
					<div className="">
						<img className="logo" src={schwifty} alt="..."/>
					</div>
				</Link>
				<h1 className="fs-2 d-flex col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">Rick & Morty BlogWars</h1>

				{/* AUTO-SEARCH */}
				<form className="auto-search col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
					<input type="text" className="form-control" onChange={(e)=>{setSearch(e.target.value)}} onKeyUp={(e)=>{handleSearchString(search)}} value={search} placeholder="Search..." aria-label="Search"></input>
				</form>
				{autoComplete.length > 0
					?<div className="dropdown-auto-search">
						{autoComplete.map((item) => <div key={item.id} className="dropdown-item">{item.name}</div>)}
					</div>
					:null
				}

				<div className="d-flex flex-row-reverse flex-lg-row justify-content-between w-100">
					{/* FAVORITES */}
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
							Favorites <span className="badge text-bg-warning">{store.favorites.length}</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end">
							{store.favorites.length > 0
								?<>{store.favorites.map((fav)=>{
									return <li key={fav} className="dropdown-item d-flex justify-content-between align-items-center" >{fav}
									<button className="btn badge text-bg-warning"
										onClick={()=>{actions.setFavorites(fav)}}>X</button>
									</li>
								})}</>
								: <li className="dropdown-item">Add a favorite</li>
							}
						</ul>
					</div>
					
					<div className="col-3 justify-content-end">
						{/* HAMBURGER MENU */}
						<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>

						{/* OFFCANVAS MENU */}
						<div className="offcanvas offcanvas-top" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
							<div className="container">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Rick & Morty BlogWars</h5>
									<div className="d-flex">
										{/* SETTINGS DROPDOWN MENU */}
										<div className="flex-shrink-0 dropdown">
											<span className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
												<i className="fa-solid fa-gear"></i>
											</span>
											<ul className="dropdown-menu dropdown-menu-end text-small shadow">
												<li>
													<div className="dropdown-item form-check">
														<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
														<label className="form-check-label" htmlFor="flexCheckDefault">Show search input suggestions</label>
													</div>
												</li>
											</ul>
										</div>
										{/* CLOSE OFFCANVAS BUTTON */}
										<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
									</div>
								</div>
								<div className="offcanvas-body d-flex justify-content-between">
									<div className="col-2 d-flex flex-column align-items-start">
										{/* <button className="btn">All</button> */}
										<span className={`fs-6 btn border-0 border-start border-3 rounded-0 ${store.schema === "character" ? "border-primary" : "border-secondary-subtle"}`} onClick={() => {actions.setDataFiltered(store.character); actions.setSchema('character')}}>Characters</span>
										<span className={`fs-6 btn border-0 border-start border-3 rounded-0 ${store.schema === "location" ? "border-primary" : "border-secondary-subtle"}`} onClick={() => {actions.setDataFiltered(store.location); actions.setSchema('location')}}>Locations</span>
										<span className={`fs-6 btn border-0 border-start border-3 rounded-0 ${store.schema === "episode" ? "border-primary" : "border-secondary-subtle"}`} onClick={() => {actions.setDataFiltered(store.episode); actions.setSchema('episode')}}>Episodes</span>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>