import firebase from "firebase/app"; // firebase
import "firebase/auth"; // firebase authentication
import "firebase/firestore"; // firebase firestore

const firebaseConfig = {
	apiKey: "AIzaSyBT4RoXDLZ505dMhCPkEuYPEeL1EUF_Wh0",
	authDomain: "safe-streets-app.firebaseapp.com",
	projectId: "safe-streets-app",
	storageBucket: "safe-streets-app.appspot.com",
	messagingSenderId: "400130243033",
	appId: "1:400130243033:web:3439d32591167991e041c8",
};

// function which returns the latest user document from firestore
const getUserDocument = async (uid) => {
	// no UID supplied, return null
	if (!uid) {
		return null;
	}
	// else user UID supplied for logged in user
	try {
		// get reference to current user document
		const userDocument = await firestore.doc(`users/${uid}`).get();
		return {
			uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error("Error fetching user", error);
	}
};

// function to create a new user with email and password
export const createUserWithEmailAndPassword = async (email, password) => {
	try {
		const { user } = await auth.createUserWithEmailAndPassword(
			email,
			password
		);
		console.log(
			"User created with email: " + user.email + "\nUID: " + user.uid
		); 
		generateUserDocument(user);
		return true;
	} catch (error) {
		return error.message;
	}
};

// function to create a user document 
export const generateUserDocument = async (user, additionalData) => {
	// if user missing, exit
	if (!user) {
		return;
	}
	// get reference to current user data in firestore by UID
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();

	// if user is logged in but no firestore document exists
	if (!snapshot.exists) {
		// get email of currently logged in user
		const { email } = user;
		try {
			await userRef.set({
				email, // set user email
				favourites: [], // initialise empty favourites array
				...additionalData,
			});
		} catch (error) {
			console.error("Firebase error: ", error.message);
		}
	}
	// call getUserDocument function with user UID
	return getUserDocument(user.uid);
};

// function to add a new favourite to a user collection of favourites
export const addUserFavourite = async (
	title,
	allCrimes,
	locationName,
	lat,
	lon,
	filters
) => {
	var user = firebase.auth().currentUser;
	var options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	};

	const timestamp = new Date().toLocaleDateString([], options);

	// create a new favourite object
	var newFavourite = {
		title: title,
		allCrimes: allCrimes,
		locationName: locationName,
		lat: lat,
		lon: lon,
		timestamp: timestamp,
		filters: filters,
	};

	// get reference to current user data in firestore by UID
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();
	// if firestore user document was found
	if (snapshot.exists) {
		try {
			await userRef.update({
				favourites: firebase.firestore.FieldValue.arrayUnion(
					Object.assign({}, newFavourite)
				),
			});
		} catch (error) {
			console.error("Error adding favourite", error);
		}
	}
	return getUserDocument(user.uid);
};

// function which retrieves the favourites for a user
export const getUserFavourites = async () => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user

	// get reference to current user data in firestore by UID
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();

	var favourites;

	// if firestore user document was found
	if (snapshot.exists) {
		try {
			favourites = snapshot.data().favourites;
			return favourites;
		} catch (error) {
			console.error("Error retriving favourites", error);
		}
	}
};

// function to remove a favourite from a user's collection of favourites
export const deleteUserFavourite = async (aTimestamp) => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user

	// get reference to current user data in firestore by UID
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();
	// if firestore user document was found
	if (snapshot.exists) {
		try {
			await userRef.update({
				favourites: snapshot
					.data()
					.favourites.filter(
						(favourite) => favourite.timestamp !== aTimestamp
					),
			});
		} catch (error) {
			console.error("Error deleting favourite", error);
		}
	}
};

// function to return a single user favourite from a user's collection of favourites
export const getUserFavourite = async (aTimestamp) => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user

	// get reference to current user data in firestore by UID
	const userRef = firestore.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();

	var favourite;

	// if firestore user document was found
	if (snapshot.exists) {
		try {
			favourite = snapshot.data().favourites.find(
				({ timestamp }) => timestamp === aTimestamp // find favourite with matching timestamp
			);
			return favourite;
		} catch (error) {
			console.error("Error retriving favourite", error);
		}
	}
};

// re-authenticate user with password
export const reauthenticateUser = async (password) => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user
	var credentials = firebase.auth.EmailAuthProvider.credential(
		user.email,
		password
	);
	await user.reauthenticateWithCredential(credentials);
};

// function to delete a user document from firestore
export const deleteUserDocument = async () => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user

	// get reference to current user data in firestore by UID
	const userDocumentRef = firestore.doc(`users/${user.uid}`);

	// delete user document from firestore
	await userDocumentRef.delete();
};

// function to delete a user account from firebase (authentication list)
export const deleteUserAccount = async () => {
	var user = firebase.auth().currentUser; //get reference to currently logged in user

	await user.delete(); //delete user authentication account record
};

// initialise firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app(); //if already initialized, use that one
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
