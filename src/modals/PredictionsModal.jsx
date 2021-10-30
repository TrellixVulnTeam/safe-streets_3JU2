import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ResultsData } from "../contexts/ResultsDataContext";
import uuid from "react-uuid";

import {
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

//style components
import { MDBIcon } from "mdbreact";

const ShowPredictionsModal = (props) => {
	const [resultsData] = useContext(ResultsData);
	const predictions = resultsData.predictions;

	//TODO test
	const activeIndex = useState(0);
	const [activeItem, setActiveItem] = useState(0);
	const [chartData, setChartData] = useState([]);

	const handleClick = (index) => {
		setActiveItem({
			activeIndex: index,
		});
	};

	// array of month names
	var months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const getPredictedMonth = () => {
		//get final graph month to display
		let predictedMonth = new Date().getMonth() + 1; //zero indexed
		predictedMonth = months[predictedMonth];

		return predictedMonth;
	};

	const getCurrentMonth = () => {
		let currentMonth = new Date().getMonth() + 1; //zero indexed
		currentMonth = months[currentMonth];

		return currentMonth;
	};

	const getCrimeCategory = (aCrimeCategory) => {
		let crimeCat = "";
		switch (aCrimeCategory) {
			case "Anti_social_behaviour":
				crimeCat = "Anti-Social Behaviour";
				break;

			case "Theft":
				crimeCat = "Theft";
				break;

			case "Burglary":
				crimeCat = "Burglary";
				break;

			case "Criminal_damage_and_arson":
				crimeCat = "Criminal Damage & Arson";
				break;

			case "Drugs":
				crimeCat = "Drugs";
				break;

			case "Public_order":
				crimeCat = "Public Order";
				break;

			case "Possession_of_weapons":
				crimeCat = "Possession of Weapons";
				break;

			case "Violent_crime":
				crimeCat = "Violent Crime";
				break;

			case "Vehicle_crime":
				crimeCat = "Vehicle Crime";
				break;

			case "Shoplifting":
				crimeCat = "Shoplifting";
				break;

			default:
				//intentially blank
				break;
		}

		return crimeCat;
	};

	const data = [];

	for (const [key, value] of Object.entries(predictions)) {
		var crimeCategory = getCrimeCategory(key);
		var percentage = parseFloat(predictions[key]);

		//console.log(crimeCategory + " " + percentage);
		var dataToAdd = {
			crime: crimeCategory,
			probability: percentage,
		};

		data.push(dataToAdd);
		
	}

	//setChartData(data);

	return (
		<Modal
			show={props.show}
			onHide={props.onHide}
			animation={false}
			size="lg"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					<h3 className="my-3">
						<MDBIcon className="addFavModal-icon" icon="bookmark" />
						Probability of crimes for {getPredictedMonth}
					</h3>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ResponsiveContainer width="100%" height={100}>
					<BarChart width={150} height={40} data={chartData}>
					
					</BarChart>
				</ResponsiveContainer>
				<p className="content">{`"${activeItem.crime}": ${activeItem.probability}`}</p>
			</Modal.Body>
		</Modal>
	);
};

export default ShowPredictionsModal;
