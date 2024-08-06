import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';
import { colors } from '../styles/colors';
import { globalStyles } from '../styles/globalStyles';
import logos from '../constants/logos.js';

const SplashPage = () => {
	return (
		<ScrollView>
			<ImageBackground
				source={{
					uri: 'https://spencerheywood.com/images/servo/Pictures/web_optimized/servo_web_banner.avif',
				}}
				style={styles.background}
				resizeMode='cover'
			>
				<View style={styles.container}>
					<Text style={styles.onlineShopping}>
						Online Shopping{'\n'}
						<Text style={styles.forYourHome}>For Your Home</Text>
					</Text>
				</View>
			</ImageBackground>

			<View style={styles.splashPageSection}>
				<Text style={styles.sectionHeader}>
					We make convenience...{' '}
					<Text style={styles.italic}>more convenient.</Text>
				</Text>
				<View style={styles.threeStepSection}>
					<View style={styles.splashPageIcon}>
						<Image
							style={styles.splashPageIconImage}
							source={{
								uri: 'https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-04.png',
							}}
						/>
						<Text style={styles.splashPageH3}>Online Quote</Text>
						<Text style={styles.iconText}>
							No waiting, no surprises. Uncover your exact cost in
							moments.
						</Text>
					</View>
					<View style={styles.splashPageIcon}>
						<Image
							style={styles.splashPageIconImage}
							source={{
								uri: 'https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-08.png',
							}}
						/>
						<Text style={styles.splashPageH3}>
							Instant Schedule
						</Text>
						<Text style={styles.iconText}>
							Select the time that works for you. It’s as simple
							as picking a day on your calendar.
						</Text>
					</View>
					<View style={styles.splashPageIcon}>
						<Image
							style={styles.splashPageIconImage}
							source={{
								uri: 'https://spencerheywood.com/images/servo/icons/icons%203/icon_clear_bkgd/icons-09.png',
							}}
						/>
						<Text style={styles.splashPageH3}>Secure Pay</Text>
						<Text style={styles.iconText}>
							Rest easy knowing your payment and personal details
							are protected.
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.logoSection}>
				{logos.map((item, index) => (
					<TouchableOpacity key={index} style={styles.logoContainer}>
						<Image
							style={styles.splashPageLogo}
							source={{ uri: item.logo }}
						/>
					</TouchableOpacity>
				))}
			</View>

			<View style={[styles.splashPageSection, styles.ctaContainer]}>
				<Image
					style={styles.splashPageImage}
					source={{
						uri: 'https://spencerheywood.com/images/servo/Pictures/garbage_can_cleaning/test.avif/Servo%20Pictures-43.avif',
					}}
				/>
				<View style={styles.sectionText}>
					<Text style={styles.title}>
						Calling All Service Providers!
					</Text>
					<Text style={styles.subtitle}>
						Do you run a service-oriented business in St. George?
						Grow your business with Servo.
					</Text>
					<TouchableOpacity
						style={styles.button}
						// onPress={handleLearnMoreClick}
					>
						<Text style={styles.buttonText}>Learn More</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	background: {
		height: 800,
		width: '100%',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: '5%',
		top: 215,
	},
	onlineShopping: {
		textAlign: 'right',
		fontWeight: 'bold',
		fontSize: 39,
		color: colors.primaryBlue,
	},
	forYourHome: {
		color: colors.primaryWhite,
	},

	splashPageSection: {
		flexDirection: 'column',
		paddingTop: 50,
		paddingHorizontal: 40,
		width: '100%',
	},
	sectionHeader: {
		...globalStyles.h1,
		marginBottom: 40,
		color: colors.primaryBlue,
	},
	italic: {
		fontStyle: 'italic',
	},
	threeStepSection: {
		flexDirection: 'column',
	},
	splashPageIcon: {
		alignItems: 'center',
		marginBottom: 20,
	},
	splashPageIconImage: {
		width: 100,
		height: 100,
		marginBottom: 10,
	},
	splashPageH3: {
		...globalStyles.h2,
		marginBottom: 20,
	},
	iconText: {
		fontSize: 16,
		textAlign: 'center',
		marginBottom: 20,
	},

	logoSection: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	logoContainer: {
		padding: 15,
		backgroundColor: 'white',
		margin: 13,
		borderRadius: 10,
	},
	splashPageLogo: {
		height: 95,
		width: 95,
		objectFit: 'contain',
	},

	ctaContainer: {
		paddingHorizontal: 0,
		height: 600,
		alignItems: 'center',
	},
	splashPageImage: {
		width: '100%',
		height: 300,
	},
	sectionText: {
		width: '80%',
	},
	title: {
		...globalStyles.h2,
		marginTop: 30,
		marginBottom: 5,
	},
	subtitle: {
		...globalStyles.h3,
		fontWeight: 'normal',
		lineHeight: 20,
		marginBottom: 15,
	},
	button: {
		...globalStyles.button,
		backgroundColor: colors.primaryYellow,
		width: '55%',
	},
	buttonText: {
		...globalStyles.buttonText,
	},
});

export default SplashPage;
