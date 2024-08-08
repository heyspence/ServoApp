import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAddress } from '../../store/addresses'
import { useMemo, useState } from 'react'
import { fetchCalendarData } from '../../store/vendors'

export default function VendorShowContent({ vendor, calendarData, galleryImageUrls }) {
	const vendorId = vendor?.id

	const router = useRouter()
	const dispatch = useDispatch()
	// const queryParams = useLocalSearchParams()
	// console.log('VendorShowContent 🩷 queryParams:', queryParams);

	const user = useSelector((state) => state.session.user)
	const homeView = useSelector((state) => state.ui.homeView)
	// Grab existing booking (if any) that have a state of "priced", "scheduled", or "pending"
	const vendorBooking = useSelector((state) => {
		return Object.values(state.bookings).find((item) => {
			const parsedId = parseInt(vendorId, 10)
			return item?.vendorId === parsedId && item?.status !== 'paid' && item?.status !== 'completed'
		})
	})
	const activeAddress = useSelector(getActiveAddress)

	// const [displayDisclaimerBottom, setDisplayDisclaimerBottom] = useState(window.innerWidth < 1000)
	const [isCalendarLoading, setIsCalendarLoading] = useState(true)
	const [openComponent, setOpenComponent] = useState({
		pricing: true,
		scheduling: false,
		summary: false,
	})

	const reviews = useMemo(() => {
		return vendor?.reviews ? Object.values(vendor.reviews) : []
	}, [vendor])

	const serviceCharge = user?.serviceCharge || 2.55
	const isVendor = user?.userType === 'vendor' && user?.vendorId === vendor?.id
	const nextAvailAppt =
		calendarData?.length > 0 ? parseISO(calendarData[0].start_time) : addDays(new Date(), 2)
	const formattedNextAvailAppt = format(nextAvailAppt, 'EEE, MMM do')
	const bookingStatus = vendorBooking?.status
	const isAllComponentsClosed = Object.values(openComponent).every((val) => val === false)
	let isMobile = true

	// useEffect(() => {
	// 	if (homeView === 'vendor') router.push('/dashboard/orders')
	// }, [homeView, history])

	// // if user is coming from order completion email to leave a review open the review form
	// useEffect(() => {
	//     const openReviewFormModal = queryParams.open_review_form_modal;

	//     if (openReviewFormModal && vendorId && !isVendor && user) {
	//         dispatch(openModal('review-form', { vendorId }));
	//         // Change query parameter to false after opening review form
	//         history.push({ search: '?open_review_form_modal=false' });
	//     } else if (openReviewFormModal && !user) {
	//         dispatch(
	//             openModal('user-session-form', { sessionType: 'Sign In' })
	//         );
	//     }
	// }, [
	//     dispatch,
	//     history,
	//     isVendor,
	//     queryParams.open_review_form_modal,
	//     user,
	//     vendorId,
	// ]);

	useEffect(() => {
		dispatch(fetchCalendarData(vendorId, isVendor, vendorBooking?.duration)).finally(() =>
			setIsCalendarLoading(false),
		)
	}, [vendorBooking?.duration])

	// useEffect(() => {
	// 	if (queryParams.open_payment_gateway) {
	// 		dispatch(openModal('payment-gateway'))
	// 	}
	// }, [queryParams.open_payment_gateway, dispatch])

	return (
		<View>
			<Text>VendorShowContent</Text>
		</View>
	)
}
