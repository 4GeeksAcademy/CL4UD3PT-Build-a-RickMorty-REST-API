const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			APIUrl: process.env.BACKEND_URL,
			userId: 1,
			schema: '',
			character: [],
			location: [],
			episode: [],
			favorite: [],
			dataFiltered: []
		},
		actions: {
			getAllCharacter: async () => {
				if (sessionStorage.getItem('character')) return setStore({ character: JSON.parse(sessionStorage.getItem('character')) });

				const response = await fetch(process.env.BACKEND_URL + "api/character");
				const data = await response.json();

				if(!data.characters.length > 0) return console.warn("Error in retrieved characters data!");

				sessionStorage.setItem('character', JSON.stringify(data.characters));
				setStore({character: JSON.parse(sessionStorage.getItem('character'))});
			},
			getAllLocation: async () => {
				if (sessionStorage.getItem('location')) return setStore({ location: JSON.parse(sessionStorage.getItem('location')) })
				
				const response = await fetch(process.env.BACKEND_URL + "api/location");
				const data = await response.json();
				
				if(!data.locations.length > 0) return console.warn("Error in retrieved locations data!");

				sessionStorage.setItem('location', JSON.stringify(data.locations));
				setStore({location: JSON.parse(sessionStorage.getItem('location'))});
			},
			getAllEpisode: async () => {
				if (sessionStorage.getItem('episode')) setStore({ episode: JSON.parse(sessionStorage.getItem('episode')) })
				
				const response = await fetch(process.env.BACKEND_URL + "api/episode");
				const data = await response.json();
				
				if(!data.episodes.length > 0) return console.warn("Error in retrieved episodes data");

				sessionStorage.setItem('episode', JSON.stringify(data.episodes));
				setStore({episode: JSON.parse(sessionStorage.getItem('episode'))});
			},
			getAllFavorites: async () => {
				if (sessionStorage.getItem('favorite')) setStore({ favorite: JSON.parse(sessionStorage.getItem('favorite')) })

				const response = await fetch(process.env.BACKEND_URL + "api/favorites/" + getStore().userId);
				const data = await response.json();

				if(!data.favorites || !data.favorites.length > 0) return console.warn("Error in retrieved favorites data");

				sessionStorage.setItem('favorite', JSON.stringify(data.favorites));
				setStore({favorite: JSON.parse(sessionStorage.getItem('favorite'))});

				// if(sessionStorage.getItem('favorites')) {
				// 	setStore({favorites: JSON.parse(sessionStorage.getItem('favorites'))})
				// } else {
				// 	sessionStorage.setItem('favorites', JSON.stringify([]));
				// }
			},
			setFavorite: async (elementId, schema = getStore().schema, favoriteId = null) => {
				const favorites = getStore().favorite;
				// CREATE NEW FAVORITE IN BACKEND AND UPDATES FRONTEND
				if(!favorites.some(fav => fav.element_id === elementId && fav.type === schema)){
					const response = await fetch(process.env.BACKEND_URL + "api/favorite/" + schema + "/" + elementId,{
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"user_id": getStore().userId
						})
					});
					if(response.ok){
						const data = await response.json();
						
						const favorites = JSON.parse(sessionStorage.getItem('favorite')) === null ? [] : JSON.parse(sessionStorage.getItem('favorite'));
						favorites.push(data.favorite);
						
						sessionStorage.setItem('favorite', JSON.stringify(favorites));
						setStore({favorite: JSON.parse(sessionStorage.getItem('favorite'))});
					}
					// We can delete the favorite here if we don't check it in the initial condition
					if(response.status === 400){
						const data = await response.json();
						console.error(response.status, data);
					}
				}else{ // DELETE FAVORITE IN BACKEND AND UPDATES FRONTEND
					const favoriteToDelete = favorites.filter((fav) => fav.element_id === elementId && fav.type === schema);
					const response = await fetch(process.env.BACKEND_URL + "api/favorite/" + favoriteToDelete[0].id, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							"user_id": getStore().userId
						})
					});
					if(response.status === 200){
						const data = await response.json();
						sessionStorage.setItem('favorite', JSON.stringify(data.favorites));
						setStore({favorite: JSON.parse(sessionStorage.getItem('favorite'))});
					}
					if(response.status === 204){
						sessionStorage.removeItem('favorite');
						setStore({favorite: []});
						return Promise.resolve({});
					}
				}
			},
			updateFavoritesButton: async (data) => {
				const favorites = JSON.parse(sessionStorage.getItem('favorite'));
				favorites.push(data);
				
				sessionStorage.setItem('favorite', JSON.stringify(favorites));
				setStore({favorite: JSON.parse(sessionStorage.getItem('favorite'))});
			},
			deleteFavoriteFromNavbar: async (favoriteId) => {
				const response = await fetch(process.env.BACKEND_URL + "api/favorite/" + favoriteId, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"user_id": getStore().userId
					})
				});
				if(response.status === 200){
					const data = await response.json();
					sessionStorage.setItem('favorite', JSON.stringify(data.favorites));
					setStore({favorite: JSON.parse(sessionStorage.getItem('favorite'))});
				}
				if(response.status === 204){
					sessionStorage.removeItem('favorite');
					setStore({favorite: []});
					return Promise.resolve({});
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
