import { View, Text } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

const VendorDetail = () => {
	const { id } = useLocalSearchParams()

	return (
		<View>
			<Text>Vendor ID: {id}</Text>
		</View>
	)
}

export default VendorDetail
