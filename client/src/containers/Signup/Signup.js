// Importing necessary libraries and components
import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import SignupForm from "./SignupForm";
import axios from "axios";
import { withRouter } from "react-router-dom";

// Styles for Material-UI components
const styles = {
	root: {
		flexGrow: 1,
	},
	headline: {
		marginTop: 30,
	},
};

class Signup extends Component {
	state = {
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
		credentials: [],
		usernameMissingError: "",
		passwordMissingError: "",
		emailMissingError: "",
		passwordLengthError: "",
		confirmPasswordError: "",
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
		const password = event.target.value;
		this.setState({
			password,
			passwordMissingError: "",
			passwordLengthError:
				password.length > 0 && password.length < 8
					? "Password is weak. Password should be at least 8 characters."
					: "",
		});
	};

	// Handle changes in the confirm password input field
	handleConfirmPasswordChange = (event) => {
		this.setState({
			confirmPassword: event.target.value,
			confirmPasswordError: "",
		});
	};

	// Handle changes in the email input field
	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value,
			emailMissingError: "",
		});
	};

	// Handle form submission for user signup
	handleFormSubmit = async (event) => {
		event.preventDefault();

		// Basic form validation
		const { username, password, confirmPassword, email } = this.state;
		let valid = true;

		if (!username) {
			this.setState({ usernameMissingError: "Username is required." });
			valid = false;
		}
		if (!password) {
			this.setState({ passwordMissingError: "Password is required." });
			valid = false;
		}
		if (!email) {
			this.setState({ emailMissingError: "Email is required." });
			valid = false;
		}
		if (!confirmPassword) {
			this.setState({ confirmPasswordError: "Confirm password." });
			valid = false;
		}
		if (password && confirmPassword && password !== confirmPassword) {
			this.setState({
				confirmPasswordError:
					"Passwords do not match. Please re-enter your password.",
			});
			valid = false;
		}

		// If the form is valid, attempt to sign up the user
		if (valid) {
			try {
				const res = await axios.post("/Auth/signup", {
					username,
					email,
					password,
				});
				// Handle successful signup (e.g., redirect to login page)
				this.props.history.push("/login");
			} catch (err) {
				console.error("Error during signup:", err);
				// Handle errors from the server (e.g., username already taken)
				this.setState({
					credentials: [],
					serverError: "Signup failed. Please try again.",
				});
			}
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
							<SignupForm
								handleFormSubmit={this.handleFormSubmit}
								handleUsernameChange={this.handleUsernameChange}
								handlePasswordChange={this.handlePasswordChange}
								handleConfirmPasswordChange={this.handleConfirmPasswordChange}
								handleEmailChange={this.handleEmailChange}
								usernameMissingError={this.state.usernameMissingError}
								passwordMissingError={this.state.passwordMissingError}
								emailMissingError={this.state.emailMissingError}
								passwordLengthError={this.state.passwordLengthError}
								confirmPasswordError={this.state.confirmPasswordError}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

// Exporting the Signup component so it can be used in other parts of the application
export default withRouter(withStyles(styles)(Signup));
