import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveAddress } from '../../../store/addresses'
import { useEffect, useMemo, useState } from 'react'
import { fetchCalendarData } from '../../../store/vendors'
import VendorMeta from './VendorShowContentChildren/VendorMeta'
import { addDays, format, parseISO } from 'date-fns'

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

	// Click handlers
	const handleScheduleClick = ({ bypass }) => {
		if ((bookingStatus && !openComponent.pricing) || bypass) {
			if (openComponent['summary'] === false) setIsCalendarLoading(true)
			setOpenComponent({
				pricing: false,
				scheduling: true,
				summary: false,
			})
		}
	}

	const handleGetPriceClick = () => {
		setOpenComponent({
			pricing: true,
			scheduling: false,
			summary: false,
		})
	}

	const handleSummaryClick = ({ bypass = false, scheduling = false } = {}) => {
		if (scheduling) {
			setOpenComponent({
				pricing: false,
				scheduling: true,
				summary: false,
			})
		} else if (
			((bookingStatus === 'scheduled' || bookingStatus === 'pending') &&
				!openComponent.scheduling) ||
			bypass
		) {
			setOpenComponent({
				pricing: false,
				scheduling: false,
				summary: true,
			})
		}
	}

	const handleCheckout = () => {
		let bookingData = {
			...vendorBooking,
			status: 'pending',
			userId: user?.id,
			addressId: activeAddress?.id,
		}

		dispatch(updateBooking({ booking: bookingData }))
		dispatch(
			openModal('payment-gateway', {
				booking: bookingData,
				resetComponents,
			}),
		)
	}

	const resetComponents = () => {
		setOpenComponent({
			pricing: true,
			scheduling: false,
			summary: false,
		})
	}

	const formattedDate = () => {
		const apptAtWithoutTimezone = vendorBooking?.appointmentAt?.replace(/([-+]\d{2}:\d{2})/, '')
		if (vendorBooking?.appointmentAt) {
			return format(apptAtWithoutTimezone, 'MMM do @ h:mm')
		} else {
			return '--'
		}
	}

	const basePricingDiv = (
		<div className="pricing-preview">
			Starting at: <br />${vendor?.minPrice ? vendor.minPrice.toFixed(2) : '--'}
		</div>
	)

	const confirmedPricingDiv = (
		<div className="pricing-preview--confirmed">
			Custom Quote
			<div className="green-text"> ${vendorBooking?.price.toFixed(2)}</div>
		</div>
	)

	const defaultSchedulingDiv = (
		<div className="scheduling-preview">
			Next Available Appointment:
			<br />
			{formattedNextAvailAppt}
		</div>
	)

	const confirmedSchedulingDiv = (
		<div className="scheduling-preview--confirmed">
			<div>Service Date</div>
			<p className="green-text">{formattedDate()}</p>
		</div>
	)

	return <VendorMeta />
}
