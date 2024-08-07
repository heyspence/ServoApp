import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import VendorIndexItem from '../components/VendorIndexItem';
import { parsedCategory } from '../util/formatting';
import { globalStyles } from '../styles/globalStyles';
import { colors } from '../styles/colors';

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
			<FlatList
				data={vendors}
				keyExtractor={(vendor) => vendor.id.toString()}
				renderItem={({ item }) => <VendorIndexItem vendor={item} />}
				// style={styles.vendorIndex}
				// contentContainerStyle={styles.vendorList}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	vendorIndexContainer: {
		padding: 16,
		backgroundColor: colors.primaryWhite,
		flex: 1,
		backgroundColor: 'blue',
	},
	heading: {
		...globalStyles.h1,
		marginVertical: 25,
	},
	// vendorIndex: {
	// 	// flex: 1,
	// 	width: 200,
	// 	backgroundColor: 'blue',
	// },
	// vendorList: {
	// 	paddingBottom: 16,
	// 	backgroundColor: 'pink',
	// },
});
