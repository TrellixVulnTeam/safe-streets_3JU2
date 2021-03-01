import React, {useContext, useEffect, useState} from 'react';
import Favourite from './Favourite';
import {UserContext} from '../auth/UserProvider';
import uuid from 'react-uuid';
import Container from 'react-bootstrap/Container';
//import Button from 'react-bootstrap/Button';
import firebase from 'firebase';
import CardDeck from 'react-bootstrap/CardDeck';

const Favourites = (props) => {
	const [localFavourites, setLocalFavourites] = useState([]);
	const user = useContext(UserContext); // Get User Context for ID

	// TODO TRY move the functions to the firebase - for favs etc
	// TODO REM - only use useContext Usercontext to get current user ID nothing else

	useEffect(() => {
		getFavourites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// TODO change functions to consts

	// Function which retrieves the favourites for a user
	const getFavourites = () => {
		var userRef = firebase.firestore().collection('users').doc(user.uid);
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

	// Function to remove a favourite from a user's collection of favourites
	const deleteFavourite = (aTitle) => {
		console.log('deleteFavourite function RUN for title: ');
		console.log(aTitle);
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

					// Update favourites state
					setLocalFavourites(favouritesToKeep); // RETURN the favourites to keep then set here
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
			Favourites List
			{localFavourites.length ? (
				<Container id="favouritesContainer">
					<br />
					<h2>Favourites for: {user.displayName}</h2>
					<br />
					<h3>You have {localFavourites.length} favourites</h3>
					<br />
					<Container>
					<CardDeck>
						{localFavourites.map((favourite) => (
							<Favourite
								key={uuid()}
								title={favourite.title}
								mapURL={favourite.mapURL}
								deleteFavourite={deleteFavourite}
							/>
						))}
					</CardDeck>
					</Container>
				</Container>
			) : (
				<div>No favourites found</div>
			)}
		</Container>
	);
};

export default Favourites;

//TODO implement Favourite component to display favourite information