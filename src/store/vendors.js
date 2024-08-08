import csrfFetch from './csrf'
import { receiveVendorCalendarData, setCurrentVendor } from './session'
import { stripTimeZone } from '../utils/timeUtils'
import { receiveErrors } from './errors'
import { closeModal } from './ui'

const RECEIVE_VENDORS = 'vendors/RECEIVE_VENDORS'
const RECEIVE_VENDOR = 'vendor/RECEIVE_VENDOR'
const RECEIVE_SERVICES = 'vendor/RECEIVE_SERVICES'
const RECEIVE_CALENDAR_DATA = 'vendor/RECEIVE_CALENDAR_DATA'

const recieveVendors = (vendors) => ({
	type: RECEIVE_VENDORS,
	vendors,
})

const recieveVendor = (vendor) => ({
	type: RECEIVE_VENDOR,
	vendor,
})

const recieveServices = (services) => ({
	type: RECEIVE_SERVICES,
	services,
})

const receiveCalendarData = (calendarData) => ({
	type: RECEIVE_CALENDAR_DATA,
	calendarData,
})

export const fetchVendors = () => async (dispatch) => {
	const res = await csrfFetch(`/api/vendors`)

	if (res.ok) {
		const data = await res.json()
		dispatch(recieveVendors(data))
	}
}

export const fetchVendor =
	(vendorId, router, updateSessionVendor = null) =>
	async (dispatch) => {
		try {
			const res = await csrfFetch(`/api/vendors/${vendorId}`)
			const data = await res.json()

			if (res.ok) {
				if (updateSessionVendor) dispatch(setCurrentVendor(data))
				else dispatch(recieveVendor(data))
			} else {
				console.error('Failed to fetch vendor data:', data.error)
				router.push('/')
			}
		} catch (error) {
			console.error('Error fetching vendor:', error)
			throw error
		}
	}

export const fetchServices = (vendorId) => async (dispatch) => {
	const res = await csrfFetch(`/api/vendors/${vendorId}/services`)
	if (res.ok) {
		const data = await res.json()
		const keys = Object.values(data)
		if (keys.length > 0) {
			dispatch(recieveServices(data))
		}
	}
}

export const fetchCalendarData =
	(vendorId, isVendor, duration = 90) =>
	async (dispatch) => {
		const res = await csrfFetch(`/api/vendors/${vendorId}/vendor_calendars?duration=${duration}`)
		if (res.ok) {
			let data = stripTimeZone(await res.json())
			vendorId = parseInt(vendorId)
			if (isVendor) {
				dispatch(receiveVendorCalendarData(data))
			} else {
				dispatch(receiveCalendarData({ vendorId, data }))
			}
		} else {
			console.log(res.statusText)
		}
	}

export const updateVendor =
	(vendor, confirmPassword = null) =>
	async (dispatch) => {
		const res = await csrfFetch(`/api/vendors/${vendor.id}`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'PATCH',
			body: JSON.stringify({ vendor: vendor, password: confirmPassword }),
		})

		const data = await res.json()

		if (res.ok) {
			dispatch(setCurrentVendor(data))
			dispatch(closeModal())
		} else {
			dispatch(receiveErrors(data.errors))
			console.log('Failed to update vendor:', res)
		}
	}

export const updatePricingOptions = (vendorId, options) => async (dispatch) => {
	const res = await csrfFetch(`/api/vendors/${vendorId}/update_pricing_input_options`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'PATCH',
		body: JSON.stringify({ pricing_input_options: options }),
	})

	if (res.ok) console.log('Options successfully updated')
	else console.log('Failed to update options:', res)
}

export const updateVendorPicture = (formData) => async (dispatch) => {
	try {
		const vendorId = formData.get('id') // Extract vendor ID from FormData
		const res = await csrfFetch(`/api/vendors/${vendorId}`, {
			method: 'PATCH',
			body: formData, // Pass the FormData directly
		})
		if (res.ok) {
			const data = await res.json()
			dispatch(setCurrentVendor(data))
		} else {
			console.error('Failed to update vendor:', res)
		}
	} catch (error) {
		console.error('Failed to update vendor:', error)
	}
}

export const deleteGalleryImage = (blobId, vendor) => async (dispatch) => {
	try {
		const res = await csrfFetch(`/api/vendors/${vendor.id}/images`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ blob_id: blobId }), // Send the blob ID to delete
		})

		if (res.ok) {
			const updatedGalleryImageUrls = vendor.galleryImageUrls.filter(
				(image) => image.blobId !== blobId,
			)
			const updatedVendor = {
				...vendor,
				galleryImageUrls: updatedGalleryImageUrls,
			}
			dispatch(setCurrentVendor(updatedVendor))
		} else {
			console.error('Failed to delete gallery image:', res)
		}
	} catch (error) {
		console.error('Failed to delete gallery image:', error)
	}
}

const vendorsReducer = (state = {}, action) => {
	let newState = { ...state }

	switch (action.type) {
		case RECEIVE_VENDORS:
			var vendors = action.vendors
			return { ...newState, ...vendors }
		case RECEIVE_VENDOR:
			return { ...newState, [action.vendor.id]: action.vendor }
		case RECEIVE_SERVICES:
			var vendorId = Object.values(action.services)[0].vendorId
			if (!newState[vendorId]) {
				newState[vendorId] = {}
			}
			newState[vendorId].services = action.services
			return newState
		case RECEIVE_CALENDAR_DATA:
			var calendarData = action.calendarData
			var calendarVendorId = calendarData.vendorId
			// Ensure the vendor and calendar objects exist
			newState[calendarVendorId] = newState[calendarVendorId] ?? {}
			newState[calendarVendorId].calendar = newState[calendarVendorId].calendar ?? {}

			// Assign the calendar data
			newState[calendarVendorId].calendar.calendarData = calendarData.data
			return newState
		default:
			return state
	}
}

export default vendorsReducer
