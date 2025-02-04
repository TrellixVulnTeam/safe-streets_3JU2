import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ButtonFilterCrime from "../components/ButtonFilterCrime";
import uuid from "react-uuid";
import {getCrimeIcon} from "../util/AssignMapIcons";
import FadeIn from "react-fade-in";


// array to hold crimes to remove from map display
let filters = [];

const FiltersModal = (props) => {
	// filter buttons
	const [crimeButtons, setCrimeButtons] = useState([
		{
			label: "Anti-Social Behaviour", // button label text
			categories: ["anti-social-behaviour"], // element categories[0] used as button id
			isActive: true, // boolean flag to determine whether to display this crime on map
		},
		{
			label: "Burglary",
			categories: ["burglary"],
			isActive: true,
		},
		{
			label: "Criminal Damage & Arson", 
			categories: ["criminal-damage-arson"],
			isActive: true,
		},
		{
			label: "Drugs",
			categories: ["drugs"],
			isActive: true,
		},
		{
			label: "Weapons",
			categories: ["possession-of-weapons"],
			isActive: true,
		},
		{
			label: "Public Order",
			categories: ["public-order", "other-crime"],
			isActive: true,
		},
		{
			label: "Robbery",
			categories: ["robbery"],
			isActive: true,
		},
		{
			label: "Shoplifting",
			categories: ["shoplifting"],
			isActive: true,
		},
		{
			label: "Theft",
			categories: [
				"other-theft",
				"bicycle-theft",
				"theft-from-the-person",
			],
			isActive: true,
		},
		{
			label: "Vehicle Crime",
			categories: ["vehicle-crime"],
			isActive: true,
		},
		{
			label: "Violent Crime",
			categories: ["violent-crime"],
			isActive: true,
		},		
	]);

	// function which returns the button label for a crime category.
	const getButtonLabel = (aCrimeCategory) => {
		let label = "";

		switch (aCrimeCategory) {
			case "anti-social-behaviour":
				label = "Anti-Social Behaviour";				
				break;

			case "burglary":
				label = "Burglary";
				break;

			case "criminal-damage-arson":
				label = "Criminal Damage & Arson";
				break;

			case "drugs":
				label = "Drugs";
				break;

			case "possession-of-weapons":
				label = "Weapons";
				break;

			case "public-order":
			case "other-crime":
				label = "Public Order";
				break;
				
			case "robbery":					
				label = "Robbery";
				break;
			
			case "shoplifting":
				label = "Shoplifting";
				break;
					
			case "theft-from-the-person":
			case "bicycle-theft":
			case "other-theft":			
				label = "Theft";
				break;

			case "vehicle-crime":
				label = "Vehicle Crime";
				break;

			case "violent-crime":			
			case "violence-and-sexual-offences":
				label = "Violent Crime";
				break;

			default:
				//intentially blank
				break;
		}

		return label;
	};

	useEffect(() => {
		if (props.favouriteFilters.length > 0) {
			for (let aFavouriteFilter of props.favouriteFilters) {
				var aLabel = getButtonLabel(aFavouriteFilter);
				changeFilterState(aLabel); // convert saved filters to button label
			}
		} else {
			filters = []; 
		}
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// function to handle user form input
	const changeFilterState = (label) => {
		const indexOfButtonToUpdate = crimeButtons.findIndex(
			(aButton) => aButton.label === label
		);

		// create copy of array
		const updatedButtons = [...crimeButtons];
		let newIsActiveStatus = !updatedButtons[indexOfButtonToUpdate].isActive;
		updatedButtons[indexOfButtonToUpdate].isActive = newIsActiveStatus;
		let categories = updatedButtons[indexOfButtonToUpdate].categories;

		// if button is now active, remove crime categories from filtered crimes list
		if (newIsActiveStatus) {
			for (let category of updatedButtons[indexOfButtonToUpdate]
				.categories) {
				filters = filters.filter(
					(crimeFilter) => crimeFilter !== category
				);
			}
		} else {
			// else add crime categories to list of crimes to filter
			for (let category of categories) {
				filters.push(category);
			}
			//TODO: filters
			console.log("filters holds: " + filters);
		}
		// update set of buttons with new state
		setCrimeButtons(updatedButtons);
	};

	// function to apply selected filters to map display
	const applyFilters = async () => {
		props.onHide(); //hide filter modal interface
		props.updateFilteredCrimes(filters);
	};

	const resetFilters = () => {
		filters = [];

		//iterate over all buttons and call the change state function for each
		for (let aButton of crimeButtons) {
			if (!aButton.isActive) {
				changeFilterState(aButton.label);
			}
		}
	};

	return (
		<Modal
			animation={false}
			show={props.show}
			onHide={props.onHide}			
			size="lg"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Crime Filters
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="filterButtonsGroup">
			<FadeIn delay={100}>
				{crimeButtons.map((aButton) => (
					<ButtonFilterCrime
						key={uuid()}
						id={aButton.categories[0]}
						label={aButton.label}
						categories={aButton.categories}
						isActive={aButton.isActive}
						changeFilterState={changeFilterState}
						getCrimeIcon={getCrimeIcon}
					/>
				))}
				</FadeIn>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="btn-footer"
					variant="red"
					onClick={resetFilters}>
					Reset
				</Button>
				<Button
					className="btn-footer"
					variant="green"
					type="submit"
					onClick={() => applyFilters()}>
					Apply
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default FiltersModal;
