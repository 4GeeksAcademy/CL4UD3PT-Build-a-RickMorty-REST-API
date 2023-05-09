const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			character: [],
			location: [],
			episode: [],
			APIUrl: process.env.BACKEND_URL,
			favorites: [],
			dataFiltered: [],
			schema: ''
		},
		actions: {
			getAllData: async (dataType, requestReturnedKey) => {
				if (localStorage.getItem(dataType)) return setStore({ character: JSON.parse(localStorage.getItem(dataType)) });

				const response = await fetch(process.env.BACKEND_URL + "api/" + dataType);
				const data = await response.json();
			
				if(!data[requestReturnedKey].length > 0) return console.warn(`Error in retrieved ${dataType} data!`);

				localStorage.setItem(dataType, JSON.stringify(data[requestReturnedKey]));
				setStore({[dataType]: JSON.parse(localStorage.getItem(dataType))});
			},
			// getAllCharacter: async () => {
			// 	const schema = "character";
				
			// 	if (localStorage.getItem('character')) return setStore({ character: JSON.parse(localStorage.getItem('character')) });

			// 	const response = await fetch(process.env.BACKEND_URL + "api/character");
			// 	const data = await response.json();
			// 	console.log("data : ", data[schema + "s"])
			// 	if(!data.characters.length > 0) return console.warn("Error in retrieved characters data!");

			// 	localStorage.setItem('character', JSON.stringify(data.characters));
			// 	setStore({character: JSON.parse(localStorage.getItem('character'))});
			// },
			// getAllLocation: async () => {
			// 	if (localStorage.getItem('location')) return setStore({ location: JSON.parse(localStorage.getItem('location')) })
				
			// 	const response = await fetch(process.env.BACKEND_URL + "api/location");
			// 	const data = await response.json();
				
			// 	if(!data.locations.length > 0) return console.warn("Error in retrieved locations data!");

			// 	localStorage.setItem('location', JSON.stringify(data.locations));
			// 	setStore({location: JSON.parse(localStorage.getItem('location'))});
			// },
			// getAllEpisode: async () => {
			// 	if (!localStorage.getItem('episode')) setStore({ episode: JSON.parse(localStorage.getItem('episode')) })
				
			// 	const response = await fetch(process.env.BACKEND_URL + "api/episode");
			// 	const data = await response.json();
				
			// 	if(!data.episodes.length > 0) return console.warn("Error in retrieved episodes data");

			// 	localStorage.setItem('episode', JSON.stringify(data.results));
			// 	setStore({episode: JSON.parse(localStorage.getItem('episode'))});
			// },
			getAllFavorites: () => {
				if(localStorage.getItem('favorites')) {
					setStore({favorites: JSON.parse(localStorage.getItem('favorites'))})
				} else {
					localStorage.setItem('favorites', JSON.stringify([]));
				}
			},
			setFavorites: (newFav) => {
				const favorites = getStore().favorites;
				if(!favorites.includes(newFav)){
					setStore({favorites: [...favorites, newFav]});
				}else{
					setStore({favorites: favorites.filter((oldFav) => oldFav != newFav)})
				}
			},
			setDataFiltered: (data) => {
				setStore({dataFiltered: data});
			},
			setSchema: (schemaType) => {
				setStore({schema: schemaType});
			}
		}
	};
};

export default getState;
