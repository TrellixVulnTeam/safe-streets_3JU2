import React, {useContext, useEffect, useState} from 'react';
import Favourite from './Favourite';
import {UserContext} from '../auth/UserProvider';
import uuid from 'react-uuid';
import Container from 'react-bootstrap/Container';
import firebase from 'firebase';
import CardDeck from 'react-bootstrap/CardDeck';
import MapDisplay from './MapDisplay';

const Favourites = (props) => {
	const [localFavourites, setLocalFavourites] = useState([]);
	const user = useContext(UserContext); // Get User Context for ID
	const [shouldDisplayMap, setShouldDisplayMap] = useState(false);
	const [mapURL, setMapURL] = useState('');

	// TODO TRY move the functions to the firebase - for favs etc
	// TODO REM - only use useContext Usercontext to get current user ID nothing else

	useEffect(() => {
		getFavourites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//TODO TEST where to display the favourites full map
	const displayFavouriteMap = (aMapURL) => {
		setMapURL(aMapURL);
		setShouldDisplayMap(true);
	};

	// TODO change functions to consts
	// TODO move getFavourites to firebase as a function
	//function which retrieves the favourites for a user
	const getFavourites = async () => {
		var userRef = await firebase
			.firestore()
			.collection('users')
			.doc(user.uid);

		userRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setLocalFavourites(doc.data().favourites);
				} else {
					console.log('No favourites!');
				}
			})
			.catch(function (error) {
				console.log('Error getting favourites:', error);
			});
	};

	// Function to remove a favourite from a user's collection of favourites based on favourite title
	const deleteFavourite = (aTitle) => {
		var userRef = firebase.firestore().collection('users').doc(user.uid);
		userRef
			.get()
			.then(function (doc) {
				if (doc.exists) {
					const favouritesToKeep = doc
						.data()
						.favourites.filter(
							(favourite) => favourite.title !== aTitle
						);
					// Update firestore doc with the filtered favourites
					userRef.update({
						favourites: favouritesToKeep,
					});

					console.log(
						'Argument returned after del by title: ' +
							favouritesToKeep
					);

					// Update favourites state
					setLocalFavourites(favouritesToKeep);
				} else {
					console.log('No favourites!');
				}
			})
			.catch(function (error) {
				console.log('Error getting favourites:', error);
			});
	};


	return (
		<Container>
			{shouldDisplayMap ? (
				<div className="map-display-div">
					<MapDisplay mapurl={mapURL} />
				</div>
			) : (
				<Container>
					{localFavourites.length ? (
						<Container id="favouritesContainer">
							<br />
							<h3>
								You have {localFavourites.length}
								{localFavourites.length > 1
									? ' favourites'
									: ' favourite'}
							</h3>
							<CardDeck>
								{localFavourites.map((favourite) => (
									<Favourite
										key={uuid()}
										title={favourite.title}
										description={favourite.description}
										mapurl={favourite.mapURL}
										timestamp={favourite.timestamp}
										deleteFavourite={deleteFavourite}
										displayFavouriteMap={
											displayFavouriteMap
										}
									/>
								))}
							</CardDeck>
						</Container>
					) : (
						<div>
							<h1>No favourites found</h1>
						</div>
					)}
				</Container>
			)}
		</Container>
	);
};

export default Favourites;

//TODO implement Favourite component to display favourite information
