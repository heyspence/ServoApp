import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { SvgXml } from 'react-native-svg'
import addressIcon from '../../../../../assets/svgs/maps-pin-black-icon.js'
import reviewStar from '../../../../../assets/svgs/reviewStar'
import { formatPhoneNumber } from '../../../../utils/formatting'
import emailIcon from '../../../../../assets/svgs/envelope-icon'
import phoneNumberIcon from '../../../../../assets/svgs/phone-call-icon.js'
import { colors } from '../../../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function VendorMeta({ vendor }) {
	// console.log('VendorMeta 🩷 vendor.logoImageUrl:', vendor.logoImageUrl)
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.metaInfoBlock}>
				<View style={styles.providerLogoBackground}>
					<Image
						style={styles.providerLogo}
						source={{ uri: vendor?.logoImageUrl }}
						alt="provider logo"
					/>
				</View>
				<View style={styles.metaInfoContainer}>
					<Text style={styles.providerName}>{vendor?.name ? vendor.name : '--'}</Text>
					<Text style={styles.reviewTag}>
						{vendor?.avgRating ? vendor.avgRating : 'New Service! '}
						<SvgXml xml={reviewStar} width="15" height="15" style={styles.reviewStarSvg} />
						{vendor?.reviewCount} ratings
					</Text>
				</View>
			</View>
			<View style={styles.phoneNumberEmailContainer}>
				<View style={styles.phoneNumberEmailInfoVendor}>
					<View style={styles.iconContainer}>
						<SvgXml xml={addressIcon} width="15" height="15" />
						<Text style={styles.addressIcon}> St. George</Text>
					</View>

					<TouchableOpacity
						onPress={() => Linking.openURL(`tel:${vendor?.phoneNumber}`)}
						style={styles.iconContainer}
					>
						<SvgXml xml={phoneNumberIcon} width="15" height="15" />
						<Text>{formatPhoneNumber(vendor?.phoneNumber)}</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => Linking.openURL(`mailto:${vendor?.email}`)}
						style={styles.iconContainer}
					>
						<SvgXml xml={emailIcon} width="15" height="15" />
						<Text>{vendor?.email}</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.serviceDescriptionCancellationContainer}>
				<Text style={styles.serviceDescriptionHeader}>Description</Text>
				<Text style={vendor?.serviceDescription ? null : { color: 'gray' }}>
					{vendor?.serviceDescription
						? vendor.serviceDescription
						: 'This service provider has not written a service description yet.'}
				</Text>
				<View style={styles.metaHr} />
				<Text style={styles.serviceDescriptionHeader}>Cancellation / Reschedule Policy</Text>
				<Text style={styles.cancellationPolicyText}>
					Appointments with {vendor?.name} can be automatically rescheduled or cancelled until{' '}
					{vendor?.cancelationPolicyHours} hour{vendor?.cancelationPolicyHours > 1 ? 's' : ''}{' '}
					before your appointment time.
				</Text>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
		width: '90%',
		alignSelf: 'center',
	},
	metaInfoBlock: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between',
		marginBottom: 10,
		padding: 0,
		position: 'relative',
		backgroundColor: 'pink',
		width: '90%',
	},
	providerLogoBackground: {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 100,
		minWidth: 100,
		position: 'relative',
		backgroundColor: 'white',
		borderRadius: 8,
		marginRight: 10,
		padding: 10,
		// box shadow
	},
	providerLogo: {
		width: 100,
		height: 100,
		resizeMode: 'contain',
	},
	metaInfoContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		width: '100%',
		backgroundColor: 'white',
		padding: 20,
		minHeight: 120,
		shadowRadius: 10,
		borderRadius: 8,
		// box shadow
	},
	providerName: {
		fontWeight: '300',
		color: colors.primaryGray,
		fontSize: 20,
	},
	reviewTag: {
		color: colors.secondaryGray,
		marginTop: 10,
	},
    reviewStarSvg: {

    },
	phoneNumberEmailContainer: {
		backgroundColor: colors.primaryWhite,
		padding: 20,
	},
	phoneNumberEmailInfoVendor: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 10,
	},
	iconContainer: {
		flexDirection: 'row',
        gap: 10
	},
	serviceDescriptionCancellationContainer: {
		lineHeight: 20,
		fontSize: 14,
		flexDirection: 'column',
		backgroundColor: colors.primaryWhite,
		color: colors.primaryBlue,
		padding: 20,
		// box shadow
	},
	serviceDescriptionHeader: {
		marginBottom: 10,
	},
	cancellationPolicyText: {
		textDecorationLine: 'none',
		fontSize: 14,
		fontWeight: '300',
	},
	metaHr: {
		marginTop: 20,
		marginBottom: 20,
		height: 1,
		backgroundColor: colors.primaryBlue,
	},
})
