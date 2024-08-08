import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import VendorIndexItem from '../VendorIndex/VendorIndexItem';
import { parsedCategory } from '../../utils/formatting';
import { globalStyles } from '../../styles/globalStyles';

export default function VendorIndex({ category, fromHome = false }) {
	const navigation = useNavigation();

	const allVendors = useSelector((state) => state.vendors);
	const homeView = useSelector((state) => state.ui?.homeView);
	const vendorId = useSelector((state) => state.session.user?.vendorId);

	const vendors = allVendors
		? Object.values(allVendors).filter(
				(vendor) => vendor.category === category
		  )
		: [];
	const vendorCategory = parsedCategory(category);

	useEffect(() => {
		if (homeView === 'vendor') navigation.navigate('Orders');
	}, [vendorId, homeView, navigation]);

	return (
		<View style={styles.vendorIndexContainer}>
			{!fromHome && <Text style={styles.heading}>{vendorCategory}</Text>}
			<View style={styles.vendorList}>
				{vendors.map((vendor) => (
					<VendorIndexItem key={vendor.id} vendor={vendor} />
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	vendorIndexContainer: {
		padding: 16,
	},
	heading: {
		...globalStyles.h1,
		marginVertical: 25,
	},
	vendorList: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
	},
});
