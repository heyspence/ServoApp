import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const globalStyles = StyleSheet.create({
	button: {
		backgroundColor: colors.primaryBlue,
		textDecoration: 'none',
		borderRadius: 8,
		fontSize: 15,
		whiteSpace: 'nowrap',
		border: 'none',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
	},
    buttonText: {
        color: colors.primaryWhite,
		fontWeight: 'bold',
    },
	buttonHover: {
		backgroundColor: colors.secondaryBlue,
		cursor: 'pointer',
	},
	grayOut: {
		borderRadius: 8,
		backgroundColor: colors.secondaryWhite,
		color: colors.secondaryGray,
		cursor: 'not-allowed',
		borderColor: colors.secondaryWhite,
		textDecoration: 'none',
	},
	grayOutInverse: {
		backgroundColor: colors.tertiaryGray,
		cursor: 'not-allowed',
		color: 'white',
	},
	body: {
		fontFamily: 'Roboto_400Regular',
		color: colors.primaryWhite,
		height: '100%',
		width: '100%',
	},
	text: {
		fontFamily: 'Roboto_400Regular',
	},
	p: {
		color: colors.primaryBlue,
	},
	h1: {
		fontSize: 30,
		color: colors.primaryBlue,
		fontWeight: 'bold',
	},
	h2: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.primaryBlue,
	},
	h3: {
		fontSize: 15,
		fontWeight: 'bold',
		color: colors.primaryBlue,
	},
	label: {
		color: colors.primaryBlue,
		fontFamily: 'Roboto_400Regular',
		fontSize: 14,
	},
	input: {
		border: 'none',
		borderRadius: 4,
		backgroundColor: colors.secondaryWhite,
		height: 40,
		paddingHorizontal: 10,
		boxSizing: 'border-box',
		fontSize: 16,
	},
	link: {
		textDecoration: 'underline',
		color: colors.primaryBlue,
	},
	linkHover: {
		color: colors.secondaryBlue,
		cursor: 'pointer',
	},
	fakeLink: {
		textDecoration: 'underline',
		cursor: 'pointer',
		width: 'fit-content',
	},
	errors: {
		color: colors.primaryYellow,
	},
});
