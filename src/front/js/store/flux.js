const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			character: [],
			location: [],
			episode: [],
			APIUrl: 'https://cl4ud3pt-fluffy-adventure-7jr6x76qrj52q7g-3001.preview.app.github.dev/api/',
			// nextCharacterUrl: 'https://rickandmortyapi.com/api/character',
			nextLocationUrl: 'https://rickandmortyapi.com/api/location',
			nextEpisodeUrl: 'https://rickandmortyapi.com/api/episode',
			favorites: [],
			dataFiltered: [],
			schema: ''
		},
		actions: {
			getAllCharacter: async () => {
				if (!localStorage.getItem('character')) {
					const response = await fetch(getStore().APIUrl + "character");
					const data = await response.json();
					const newData = [...getStore().character, ...data]
					localStorage.setItem('character', JSON.stringify(newData));
					setStore({character: JSON.parse(localStorage.getItem('character'))});
					// setStore({character: JSON.parse(localStorage.getItem('character')), nextCharacterUrl: data.info.next});
				} else {	
					setStore({
						character: JSON.parse(localStorage.getItem('character')),
						characterCount: JSON.parse(localStorage.getItem('character')).length
					})
				}
			},
			getAllLocation: async () => {
				if (!localStorage.getItem('location')) {
					const response = await fetch(getStore().nextLocationUrl);
					const data = await response.json();
					localStorage.setItem('location', JSON.stringify(data.results));
					setStore({location: JSON.parse(localStorage.getItem('location')), nextLocationUrl: data.info.next});
				} else {
					setStore({
						location: JSON.parse(localStorage.getItem('location')),
						locationCount: JSON.parse(localStorage.getItem('location')).length
					})
				}
			},
			getAllEpisode: async () => {
				if (!localStorage.getItem('episode')) {
					const response = await fetch(getStore().nextEpisodeUrl);
					const data = await response.json();
					localStorage.setItem('episode', JSON.stringify(data.results));
					setStore({episode: JSON.parse(localStorage.getItem('episode')), nextEpisodeUrl: data.info.next});
				} else {
					setStore({
						episode: JSON.parse(localStorage.getItem('episode')),
						episodeCount: JSON.parse(localStorage.getItem('episode')).length
					})
				}
			},
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
