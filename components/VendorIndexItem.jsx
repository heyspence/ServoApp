import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

export default function VendorIndexItem({ vendor }) {
	const {
		id,
		name,
		thumbnailImageUrl,
		logoImageUrl,
		avgRating,
		reviewCount,
	} = vendor;

	const navigation = useNavigation();

	const vendorRedirect = () => {
		navigation.navigate('VendorDetails', { vendorId: id });
	};

	let formattedAvgRating = reviewCount > 0 ? avgRating : 'New Service!';

	return (
		<TouchableOpacity
			style={styles.vendorIndexItem}
			onPress={vendorRedirect}
		>
			<View style={styles.vendorIndexImageContainer}>
				<Image
					source={{ uri: thumbnailImageUrl }}
					style={styles.thumbnailImage}
				/>
			</View>
			<View style={styles.vendorIndexItemMetaInfoContainer}>
				{/* <Image
					source={{ uri: logoImageUrl }}
					style={styles.logoImage}
				/> */}
				<View style={styles.vendorIndexItemMetaInfo}>
					<Text style={styles.vendorName}>{name}</Text>
					<View style={styles.macroReviewContainer}>
						<Text style={styles.formattedAvgRating}>
							{formattedAvgRating}
						</Text>
						{/* svg */}
						<Text style={styles.reviewCount}>({reviewCount})</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	vendorIndexItem: {
		borderRadius: 8,
		margin: 10,
		// backgroundColor: 'pink',
		backgroundColor: colors.secondaryWhite,
		// width: 200,
		width: 150,
		backgroundColor: 'red',
	},
	vendorIndexImageContainer: {
		height: 175,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	thumbnailImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	vendorIndexItemMetaInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 12,
	},
	// logoImage: {
	// 	width: 55,
	// 	height: 55,
	// 	backgroundColor: '#FFFFFF',
	// 	padding: 5,
	// 	borderRadius: 5,
	// 	marginRight: 12,
	// 	flexShrink: 0,
	// },
	vendorIndexItemMetaInfo: {
		width: '100%',
	},
	vendorName: {
		...globalStyles.h3,
		marginBottom: 3,
		fontWeight: 'bold',
		color: '#333',
		fontSize: 16,
	},
	macroReviewContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	formattedAvgRating: {
		...globalStyles.h3,
		fontSize: 13,
	},
	reviewStarSvg: {
		margin: -2,
		marginHorizontal: 6,
		verticalAlign: 'middle',
		transform: [{ scale: 0.9 }],
	},
	reviewCount: {
		color: colors.secondaryGray,
	},
});
