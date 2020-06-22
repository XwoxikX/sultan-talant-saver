import React, {Component} from 'react';
import logo from '../Images/game-of-sultans.png'

class Header extends Component {
	render() {
		return (
			<nav className="col s12 m12">
				<div className="nav-wrapper center  brown lighten-1">
					<a href="/"><img className="logo " src={logo}  alt="" /></a>
				</div>
			</nav>
		);
	}
}

export default Header;