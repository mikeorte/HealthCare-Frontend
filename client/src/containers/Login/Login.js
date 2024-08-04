// Importing React since we are using React.
import React, { Component } from "react";
// Importing UI components and styles from Material-UI
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
// Importing LoginForm component
import LoginForm from "./LoginForm";
// Importing axios for making HTTP requests
import axios from "axios";
// Importing withRouter for navigation
import { withRouter } from "react-router-dom";

// Define styles for the Material-UI components
const styles = {
	root: {
		flexGrow: 1,
	},
	headline: {
		marginTop: 30,
	},
};

class Login extends Component {
	// Initial state for the component
	state = {
		username: "",
		password: "",
		credentials: [],
		usernameMissingError: "",
		passwordMissingError: "",
	};

	// Handle changes in the username input field
	handleUsernameChange = (event) => {
		this.setState({
			username: event.target.value,
			usernameMissingError: "",
		});
	};

	// Handle changes in the password input field
	handlePasswordChange = (event) => {
		this.setState({
			password: event.target.value,
			passwordMissingError: "",
		});
	};

	// Handle form submission for user login
	handleFormSubmit = (event) => {
		event.preventDefault();
		const { history, setUser } = this.props;

		// Basic form validation
		let valid = true;

		if (this.state.username === "") {
			this.setState({ usernameMissingError: "Username is required." });
			valid = false;
		}

		if (this.state.password === "") {
			this.setState({ passwordMissingError: "Password is required." });
			valid = false;
		}

		// If the form is valid, attempt to log in the user
		if (valid) {
			axios
				.post("/Auth/login", {
					username: this.state.username,
					password: this.state.password,
				})
				.then((res) => {
					console.log(res.data);
					setUser(res.data.userId);
					history.push("/home");
				})
				.catch((err) => {
					console.error("Login failed:", err);
					this.setState({
						passwordMissingError: "Invalid username or password.",
					});
				});
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div style={{ padding: 70 }}>
				<Grid item xs={12} className={classes.headline}>
					<Grid
						container
						spacing={16}
						className={classes.root}
						justify="center"
					>
						{/* Welcome message */}
						<Typography variant="display1">Welcome to HealthCare</Typography>
					</Grid>
				</Grid>

				<div className="main-content-section">
					<Grid item xs={12} className={classes.headline}>
						<Grid
							container
							spacing={16}
							className={classes.root}
							justify="center"
						>
							{/* LoginForm component for handling user login */}
							<LoginForm
								handleFormSubmit={this.handleFormSubmit}
								handleUsernameChange={this.handleUsernameChange}
								handlePasswordChange={this.handlePasswordChange}
								usernameMissingError={this.state.usernameMissingError}
								passwordMissingError={this.state.passwordMissingError}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

// Exporting the Login component so it can be rendered in App.js
export default withRouter(withStyles(styles)(Login));
