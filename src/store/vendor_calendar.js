import csrfFetch from './csrf'
import { receiveErrors } from './errors'
import { removeVendorCalendar, setCurrentVendor, setVendorCalendar } from './session'
import { closeModal } from './ui'

export const updateCalendar = (payload) => async (dispatch) => {
	if (Object.keys(payload).includes('vendor')) {
		const res = await csrfFetch(`/api/vendors/${payload.vendor.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ vendor: payload.vendor }),
		})
		if (res.ok) {
			const data = await res.json()
			dispatch(setCurrentVendor(data))
		} else {
			console.log(res)
		}
	}
	if (Object.keys(payload).includes('vendorCalendar')) {
		const res = await csrfFetch(`/api/vendor_calendars/${payload.vendorCalendar.id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				vendorCalendar: payload.vendorCalendar,
			}),
		})
		if (res.ok) {
			const data = await res.json()
			dispatch(setVendorCalendar(data.calendar))
		} else {
			console.log(res)
		}
	}
}

export const deleteCalendar = (vendor, confirmPassword) => async (dispatch) => {
	const res = await csrfFetch(`/api/vendor_calendars/${vendor.calendar.id}`, {
		method: 'DELETE',
		body: JSON.stringify({ password: confirmPassword }),
	})

	if (res.ok) {
		const updatedCalendar = { ...vendor.calendar }
		updatedCalendar.apiIntegrated = false
		updatedCalendar.integratedCalendarId = ''

		dispatch(removeVendorCalendar({ calendar: updatedCalendar }))
		dispatch(closeModal())
	} else {
		const data = await res.json()
		dispatch(receiveErrors(data.errors))
	}
}
