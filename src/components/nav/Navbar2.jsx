import React, {useContext, useState} from 'react';
import {UserContext} from '../../auth/UserProvider';
//import {Link} from '@reach/router';
import {ReactComponent as Logo} from '../../images/logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import {auth} from '../../firebase';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import Search from '../../components/Search';
import Favourites from '../../components/Favourites';
import Login from '../../components/Login';
import Register from '../../components/Register';
import Profile from '../../components/Profile';

//import ReactDOM from "react-dom";
import {Link, NavLink, Route} from 'react-router-dom';

const Navbar2 = (props) => {
	const user = useContext(UserContext); // Get User Context
	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	//TODO replace all with Navbar stuff
	return (
		<Navbar>
			<Navbar.Brand as={Link} to="/">
				<Logo />
				Safe Streets
			</Navbar.Brand>

			{user ? (
				<Nav>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>

					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<Nav.Link as={NavLink} to="/favourites">
							Favourites
						</Nav.Link>

						<Nav.Link as={NavLink} to="/search">
							Search
						</Nav.Link>

						<NavDropdown
							title={
								<span>
									<i className="fa fa-user fa-lg" />
									{user.email}
								</span>
							}>
							<Nav.Link
								as={Link}
								to="/profile"
								onClick={closeMobileMenu}>
								<i className="fa fa-envelope fa-lg" />
								  Profile
							</Nav.Link>

							<Dropdown.Divider />

							<Nav.Link
								as={Link}
								to="/"
								onClick={() => auth.signOut()}>
								<i className="fas fa-sign-out-alt fa-lg" />
								  Logout
							</Nav.Link>
						</NavDropdown>
					</ul>
				</Nav>
			) : (
				<Nav>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</div>

					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className="nav-item">
							<Link
								to="/register"
								className="nav-links-mobile"
								onClick={closeMobileMenu}>
								Register
							</Link>
						</li>

						<li className="nav-item">
							<Link
								to="/"
								className="nav-links-mobile"
								onClick={closeMobileMenu}>
								Login
							</Link>
						</li>
					</ul>
				</Nav>
			)}
		</Navbar>
	);

	//	<Route path="/" exact component={Search} />
	//<Route path="/search" exact component={Search} />
	//	<Route path="/favourites" exact component={Favourites} />

	// TODO issue with navbar could be due to it not being given routes in the
	// TODO applicaiton top path - check where routes are defined
	//<Route path="/favourites" exact component={Favourites} />
	//<Route exact path="/" component={Search} />

	// return (
	//   <React.Fragment>
	//     <nav className="navbar navbar-expand-lg">

	//       <Navbar.Brand>
	//         <a className="navbar-brand" href="/" onClick={closeMobileMenu}>
	//           <div className="d-inline-block align-top">
	//             <Logo />
	//             Safe Streets
	//           </div>
	//         </a>
	//       </Navbar.Brand>

	//       {user
	//        // ? <React.Fragment>
	//             <div className="menu-icon" onClick={handleClick}>
	//               <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
	//             </div>

	//             <ul className={click ? 'nav-menu active' : 'nav-menu'}>

	//               <li className="nav-item">
	//                 <Nav.Link
	//                 as={Link}
	//                   to="/search"
	//                   className="nav-links"
	//                   onClick={closeMobileMenu}
	//                 >
	//                   Search
	//                 </Nav.Link>
	//               </li>

	//               <li className="nav-item">
	//               <Nav.Link
	//                 as={Link}
	//                   to="/favourites" onClick={closeMobileMenu}>
	//                   Favourites
	//                 </Nav.Link>
	//               </li>

	//               <NavDropdown
	//                 title={
	//                   <span>
	//                     <i className="fa fa-user fa-fw" /> {user.email}
	//                   </span>
	//                 }
	//               >

	//                 <NavDropdown.Item>
	//                   <li>
	//                   <Nav.Link
	//                 as={Link}
	//                   to="/profile" onClick={closeMobileMenu}>
	//                       <i className="fa fa-envelope fa-lg" /> Profile
	//                     </Nav.Link>
	//                   </li>
	//                 </NavDropdown.Item>

	//                 <Dropdown.Divider />

	//                 <NavDropdown.Item>
	//                   <i className="fas fa-sign-out-alt fa-lg" />
	//                   <Nav.Link
	//                 as={Link}
	//                   to="/"
	//                     onClick={() => auth.signOut ()}
	//                     className="nav-links"
	//                   >
	//                     Logout
	//                   </Nav.Link>
	//                 </NavDropdown.Item>
	//               </NavDropdown>
	//             </ul>
	//           </React.Fragment>
	//         : <React.Fragment>
	//             <div className="menu-icon" onClick={handleClick}>
	//               <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
	//             </div>

	//             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
	//               <li className="nav-item">
	//                 <Link
	//                   to="/register"
	//                   className="nav-links-mobile"
	//                   onClick={closeMobileMenu}
	//                 >
	//                   Register
	//                 </Link>
	//               </li>

	//               <li className="nav-item">
	//                 <Link
	//                   to="/"
	//                   className="nav-links-mobile"
	//                   onClick={closeMobileMenu}
	//                 >
	//                   Login
	//                 </Link>
	//               </li>
	//             </ul>
	//           </React.Fragment>}
	//     </nav>
	//   </React.Fragment>
	// );
};

export default Navbar2;

// TODO favourites navbar link refreshes page, the search link works as intended
