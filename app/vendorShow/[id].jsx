import { useLocalSearchParams, useRouter } from 'expo-router'
import { fetchVendor } from '../../src/store/vendors'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import VendorShowContent from '../../src/components/BothSides/VendorShowContent'

export default function VendorShow() {
	const { id } = useLocalSearchParams()

	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchVendor(Number(id), router))
	}, [dispatch, id, router])

	const vendor = useSelector((state) => state.vendors[id])
	const calendarData = useSelector((state) => state.vendors[id]?.calendar?.calendarData)
	const galleryImageUrls = useSelector((state) => state.vendors[id]?.galleryImageUrls)

	return (
		vendor && (
			<VendorShowContent
				vendor={vendor}
				calendarData={calendarData}
				galleryImageUrls={galleryImageUrls}
			/>
		)
	)
}
