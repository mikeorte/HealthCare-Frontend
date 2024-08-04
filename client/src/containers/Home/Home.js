// Importing React since we are using React.
import React, { Component } from "react";
// Importing UI components from Rebass.
import { Subhead, Link } from "rebass";
// Importing UI components from Material-UI.
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
// Importing icons/images.
import report from "../../assets/images/medical_report.png";
import journal from "../../assets/images/journal.png";
import appointment from "../../assets/images/appointment.png";
import prescription from "../../assets/images/prescription.png";
import doctor from "../../assets/images/doctor.png";
// Importing Navbar component.
import NavBar from "../../Components/AppBar";

// Define styles for Material-UI components.
const styles = {
	root: {
		flexGrow: 1,
	},
	headline: {
		marginTop: 50,
	},
	heading: {
		fontSize: 35,
		fontStyle: "Sans-serif",
	},
};

class Home extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				{/* Navigation bar */}
				<NavBar />

				{/* Main content section */}
				<div style={{ padding: 70 }}>
					<Grid item xs={12} className={classes.headline}>
						<Grid
							container
							spacing={24}
							className={classes.root}
							justify="center"
						>
							{/* Main heading */}
							<Typography
								variant="display1"
								align="center"
								style={{ fontStyle: "Sans-serif" }}
							>
								What would you like to do today?
							</Typography>
						</Grid>
					</Grid>

					<div className="main-content-section">
						<Grid container spacing={24} className={classes.root}>
							{/* Section for accessing health log */}
							<Grid item xs={12} sm={6} md={4} className={classes.headline}>
								<Typography align="center" className={classes.heading}>
									My health log
								</Typography>
								<Subhead align="center">
									<Link href="/log">
										<img src={report} alt="clipboard" />
									</Link>
								</Subhead>
							</Grid>

							{/* Section for accessing symptom journal */}
							<Grid item xs={12} sm={6} md={4} className={classes.headline}>
								<Typography align="center" className={classes.heading}>
									My symptom journal
								</Typography>
								<Subhead align="center">
									<Link href="/symptoms">
										<img src={journal} alt="health journal" />
									</Link>
								</Subhead>
							</Grid>

							{/* Section for accessing appointments */}
							<Grid item xs={12} sm={6} md={4} className={classes.headline}>
								<Typography align="center" className={classes.heading}>
									Appointments
								</Typography>
								<Subhead align="center">
									<Link href="/appointments">
										<img src={appointment} alt="calendar" />
									</Link>
								</Subhead>
							</Grid>

							{/* Section for accessing prescriptions */}
							<Grid item xs={12} sm={6} md={4} className={classes.headline}>
								<Typography align="center" className={classes.heading}>
									My prescriptions
								</Typography>
								<Subhead align="center">
									<Link href="/prescriptions">
										<img src={prescription} alt="prescription card" />
									</Link>
								</Subhead>
							</Grid>

							{/* Section for accessing doctors and clinics */}
							<Grid item xs={12} sm={6} md={4} className={classes.headline}>
								<Typography align="center" className={classes.heading}>
									Doctors and clinics
								</Typography>
								<Subhead align="center">
									<Link href="/doctors">
										<img src={doctor} alt="doctor" />
									</Link>
								</Subhead>
							</Grid>
						</Grid>
					</div>
				</div>
			</div>
		);
	}
}

// Exporting the Home component so it can be rendered in the App.js file.
export default withStyles(styles)(Home);
