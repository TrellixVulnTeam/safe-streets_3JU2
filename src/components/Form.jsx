import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import UKMapImage from '../images/ukVectorGuide.svg';

// Style components
import {MDBBtn, MDBInput} from 'mdbreact';

const Search = (props) => {
	const {
		submitForm,
		formInputHandler,
		locationName,
		lat,
		lon,
		numberOfMonths,
		error,
		dropHandler,
		radioButton,
		radioClickedHandler,
		handleShowImage,
		imageOpen,
	} = props;

	return (
		<form onSubmit={submitForm}>
			<fieldset
				className={
					radioButton === '0'
						? 'selectedFieldSet'
						: 'notSelectedFieldSet'
				}>
				<label>
					Search by street location
					<input
						className="form-radio"
						type="radio"
						checked={radioButton === '0'}
						onClick={(e) => radioClickedHandler('0')}
						onChange={formInputHandler}
						id="searchRadioStreet"
					/>
				</label>

				<MDBInput
					autoFocus={{radioButton} === '0' ? true : false}
					label="Street Address..."
					size="lg"
					icon="road"
					type="text"
					name="namedLocation"
					value={locationName}
					onChange={formInputHandler}
					onClick={(e) => radioClickedHandler('0')}
				/>
			</fieldset>

			<fieldset
				className={
					radioButton === '1'
						? 'selectedFieldSet'
						: 'notSelectedFieldSet'
				}>
				<label>
					{' '}
					Search by latitude and longitude
					<input
						className="form-radio"
						type="radio"
						checked={radioButton === '1'}
						onClick={(e) => radioClickedHandler('1')}
						onChange={formInputHandler}
						id="searchRadioLatLon"
					/>
				</label>

				<MDBInput
					autoFocus={radioButton === '1' ? true : false}
					label="Latitude..."
					size="lg"
					icon="map-marker-alt"
					type="text"
					name="lat"
					value={lat}
					onChange={formInputHandler}
					onClick={(e) => radioClickedHandler('1')}
				/>
				<MDBInput
					label="Longitude..."
					size="lg"
					icon="map-marker-alt"
					type="text"
					name="lon"
					value={lon}
					onChange={formInputHandler}
					onClick={(e) => radioClickedHandler('1')}
				/>

				<MDBBtn
					id="showMApGuide"
					color="warning"
					className="mb-3"
					block
					size="lg"
					onClick={handleShowImage}>
					UK boundary guide
				</MDBBtn>

				{imageOpen && (
					<dialog
						className="dialog"
						style={{position: 'absolute'}}
						open
						onClick={handleShowImage}>
						<img
							className="image"
							src={UKMapImage}
							onClick={handleShowImage}
							alt="UK Map"
						/>
					</dialog>
				)}
			</fieldset>
			<legend>Number of previous month's records to include?</legend>
			<Dropdown
				name="monthsDropdown"
				id="dropdown-months-button"
				size="lg"
				onSelect={(e) => dropHandler(e)}>
				<Dropdown.Toggle variant="danger" id="dropdown-months-toggle">
					{numberOfMonths} months
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item eventKey="3">3 Months</Dropdown.Item>
					<Dropdown.Item eventKey="6">6 Months</Dropdown.Item>
					<Dropdown.Item eventKey="12">12 Months</Dropdown.Item>
					<Dropdown.Item eventKey="24">24 Months</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>

			<div className="text-center mt-4">
				{error !== null && (
					<div className="py-4 bg-red-600 w-full text-red text-center mb-3">
						{error}
					</div>
				)}
				<MDBBtn
					id="searchSubmitButton"
					color="secondary"
					className="mb-3"
					block
					size="lg"
					type="submit">
					Submit
				</MDBBtn>
			</div>
		</form>
	);
};

export default Search;