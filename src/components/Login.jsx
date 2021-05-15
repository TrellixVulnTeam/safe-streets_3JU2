import React, {useState} from 'react';
import {auth} from '../firebase';
import {Link} from 'react-router-dom';

// Style components
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBModalFooter,
	MDBIcon,
	MDBCardHeader,
	MDBBtn,
	MDBInput,
} from 'mdbreact';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	// Sign in user with firebase sign in method
	const signInWithEmailAndPasswordHandler = (e, email, password) => {
		e.preventDefault();

		// Sign user in with firebase sign in method
		auth.signInWithEmailAndPassword(email, password).catch((error) => {
			setError('' + error);
		});
	};

	// Function to handle user form input
	const onChangeHandler = (e) => {
		const {name, value} = e.currentTarget;
		// If email input set email state
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			// If password input, set password state
			setPassword(value);
		}
	};
// TODO - prop-types - check prop types where they are used!!!


	// TODO match login and register forms button size, and distance within page from navbar
	return (
		<MDBContainer>
			<MDBRow>
				<MDBCol md="6">
					<MDBCard>
						<MDBCardBody>
							<MDBCardHeader className="form-header bg-primary rounded">
								<h3 className="my-3">
									<MDBIcon icon="lock" /> Login:
								</h3>
							</MDBCardHeader>
							<form>
								<div className="grey-text">
									<MDBInput
										label="Type your email"
										size="lg"
										icon="envelope"
										autoComplete="email"
										group
										type="email"
										name="email"
										validate
										error="wrong"
										success="right"
										required
										value={email}
										onChange={(e) => onChangeHandler(e)}
									/>

									<MDBInput
										label="Type your password"
										size="lg"
										icon="lock"
										autoComplete="current-password"
										required
										group
										type="password"
										name="password"
										validate
										value={password}
										onChange={(e) => onChangeHandler(e)}
									/>
								</div>

								<div className="text-center mt-4">
									{error !== null && (
										<div className="py-4 bg-red-600 w-full text-red text-center mb-3">
											{error}
										</div>
									)}
									<MDBBtn
										color="light-blue"
										className="mb-3"
										type="submit"
										onClick={(e) => {
											signInWithEmailAndPasswordHandler(
												e,
												email,
												password
											);
										}}>
										Login
									</MDBBtn>
								</div>
							</form>

							<MDBModalFooter>
								<div className="font-weight-light">
									Don't have an account?
									<Link
										to="/register"
										strong="true"
										className="py-4 font-weight-bold ml-1 w-full text-red text-center mb-3">
										Register
									</Link>
								</div>
							</MDBModalFooter>
						</MDBCardBody>
					</MDBCard>
				</MDBCol>
			</MDBRow>
		</MDBContainer>
	);
};
export default Login;
