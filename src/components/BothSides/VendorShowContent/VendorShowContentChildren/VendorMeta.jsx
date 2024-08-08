import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native'

export default function VendorMeta({ vendor }) {
	return (
		<>
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
						{/* <StarSvg style={styles.reviewStarSvg} /> */}
						{vendor?.reviewCount} ratings
					</Text>
				</View>
			</View>
			<View style={styles.phoneNumberEmailContainer}>
				<View style={styles.phoneNumberEmailInfoVendor}>
					<TouchableOpacity onPress={() => {}}>
						{/* <AddressIcon style={styles.vendorInfoIcon} /> */}
						<Text style={styles.addressIcon}> St. George</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => Linking.openURL(`tel:${vendor?.phoneNumber}`)}>
						{/* <PhoneNumberIcon style={styles.vendorInfoIcon} /> */}
						{/* <Text>{formatPhoneNumber(vendor?.phoneNumber)}</Text> */}
					</TouchableOpacity>
					<TouchableOpacity onPress={() => Linking.openURL(`mailto:${vendor?.email}`)}>
						{/* <EmailIcon style={styles.vendorInfoIcon} /> */}
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
		</>
	)
}

const styles = StyleSheet.create({})
