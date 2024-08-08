import { setAddresses } from './addresses'
import csrfFetch, { restoreCSRF } from './csrf'
import { receiveErrors } from './errors'
import { receiveOrders } from './orders'
import { closeModal, setHomeView } from './ui'

const SET_CURRENT_USER = 'session/SET_CURRENT_USER'
const REMOVE_CURRENT_USER = 'session/REMOVE_CURRENT_USER'
const SET_CURRENT_VENDOR = 'session/SET_CURRENT_VENDOR'
const SET_VENDOR_CALENDAR = 'session/SET_VENDOR_CALENDAR'
const REMOVE_VENDOR_CALENDAR = 'session/REMOVE_VENDOR_CALENDAR'
const SET_STAGED_FORMULA = 'session/SET_STAGED_FORMULA'
const RECIEVE_CALENDAR_DATA = 'session/RECIEVE_CALENDAR_DATA'
const SET_GUEST_INPUTS = 'session/SET_GUEST_INPUTS'

export const setCurrentUser = (user) => ({
	type: SET_CURRENT_USER,
	user,
})

export const setCurrentVendor = (vendor) => ({
	type: SET_CURRENT_VENDOR,
	vendor,
})

export const setVendorCalendar = (calendar) => ({
	type: SET_VENDOR_CALENDAR,
	calendar,
})

export const removeVendorCalendar = ({ calendar }) => ({
	type: REMOVE_VENDOR_CALENDAR,
	calendar,
})

export const setStagedFormula = (formula) => ({
	type: SET_STAGED_FORMULA,
	formula,
})

export const receiveVendorCalendarData = (calendarData) => ({
	type: RECIEVE_CALENDAR_DATA,
	calendarData,
})

export const setGuestInputs = (inputs) => ({
	type: SET_GUEST_INPUTS,
	inputs,
})

export const storeCurrentUser = (user) => {
	if (user) {
		//sessionStorage.setItem('currentUser', JSON.stringify(user));
	} else {
		//sessionStorage.removeItem('currentUser');
	}
}

const removeCurrentUser = () => {
	//sessionStorage.removeItem('X-CSRF-Token');
	//sessionStorage.setItem('currentUser', null);
}

export const selectCurrentUser = (state) => (state?.session ? state.session.user : null)

export const isLoggedIn = (state) => !!selectCurrentUser(state)

export const signUp =
	(user, history = null, isOnGuestCheckout = false, onGuestSignUpOrInSuccess = null) =>
	async (dispatch) => {
		const res = await csrfFetch(`/api/users`, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify({ user: user }),
		})

		const data = await res.json()

		if (res.ok) {
			dispatch(setCurrentUser(data.user))
			storeCurrentUser(data.user)
			dispatch(setHomeView(data.user.userType))
			dispatch(setAddresses(data.addresses))

			if (history) history.push('/home') // if user is logging in from anywhere other than show
			if (!isOnGuestCheckout) dispatch(closeModal())
			onGuestSignUpOrInSuccess?.()
		} else {
			dispatch(receiveErrors(data.errors))
		}
	}

export const vendorSignUp = (vendor, history) => async (dispatch) => {
	const res = await csrfFetch(`/api/vendors`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({ vendor: vendor }),
	})

	let data = await res.json()

	if (res.ok) {
		storeCurrentUser(data.user)
		dispatch(setCurrentUser(data.user))
		dispatch(setCurrentVendor(data.vendor))
		dispatch(setAddresses(data.addresses))
		dispatch(setHomeView('vendor'))
		dispatch(closeModal())
		history.push('/')
	} else {
		dispatch(receiveErrors(data.errors))
	}
}

export const restoreSession = () => async (dispatch) => {
	const res = await csrfFetch(`/api/session`)
	const token = res.headers.get('X-CSRF-Token')

	if (token) {
		//sessionStorage.setItem('X-CSRF-Token', token);
	} else {
		//sessionStorage.removeItem('X-CSRF-Token');
	}

	const data = await res.json()

	if (data.user) {
		//sessionStorage.setItem('currentUser', JSON.stringify(data.user));
		dispatch(setCurrentUser(data.user))

		dispatch(setHomeView(data.user.userType))
		dispatch(setAddresses(data.addresses))

		if (data.orders) dispatch(receiveOrders({ orders: data.orders }))
		if (data.vendor) dispatch(setCurrentVendor(data.vendor))
	}
}

export const signIn =
	(user, history, isOnGuestCheckout = false, onGuestSignUpOrInSuccess = null) =>
	async (dispatch) => {
		const attemptSignIn = async (retryCount = 0) => {
			const maxRetries = 1
			try {
				const res = await csrfFetch(`/api/session`, {
					headers: { 'Content-Type': 'application/json' },
					method: 'POST',
					body: JSON.stringify({ user }),
				})

				const data = await res.json()

				if (res.ok) {
					storeCurrentUser(data.user)
					dispatch(setCurrentUser(data.user))
					dispatch(setHomeView(data.user.userType))
					dispatch(setAddresses(data.addresses))
					if (data.orders) dispatch(receiveOrders({ orders: data.orders }))

					if (data.vendor) dispatch(setCurrentVendor(data.vendor))
					else if (history) history.push('/home')

					if (!isOnGuestCheckout) dispatch(closeModal())
					onGuestSignUpOrInSuccess?.()
				} else {
					if (data.errors.includes('Invalid Authenticity Token') && retryCount < maxRetries) {
						await restoreCSRF()
						return attemptSignIn(retryCount + 1)
					} else {
						dispatch(receiveErrors(data.errors))
					}
				}
			} catch (error) {
				dispatch(receiveErrors({ errors: ['An unexpected error occurred.'] }))
			}
		}

		return attemptSignIn()
	}

export const logout = () => async (dispatch) => {
	const res = await csrfFetch('/api/session', {
		method: 'DELETE',
	})

	if (res.ok) {
		dispatch({ type: REMOVE_CURRENT_USER })
		removeCurrentUser()
		window.location.href = '/'
	} else {
		console.log(res)
	}
}

const initialState = {
	// user: JSON.parse(//sessionStorage.getItem('currentUser')),
}

const sessionReducer = (state = initialState, action) => {
	let newState = { ...state }

	switch (action.type) {
		case SET_CURRENT_USER:
			return { ...newState, user: action.user }
		case SET_CURRENT_VENDOR:
			newState.vendor = action.vendor
			return newState
		case SET_VENDOR_CALENDAR:
			const calendar = action.calendar
			newState.vendor.calendar = calendar
			return newState
		case REMOVE_VENDOR_CALENDAR:
			newState.vendor.calendar = action.calendar
			return newState
		case RECIEVE_CALENDAR_DATA:
			newState.vendor.calendar.calendarData = action.calendarData
			return newState
		case REMOVE_CURRENT_USER:
			return { ...newState, user: null }
		case SET_STAGED_FORMULA:
			const stagedFormula = action.formula
			return { ...newState, vendor: { ...state.vendor, stagedFormula } }
		case SET_GUEST_INPUTS:
			newState.inputs = { ...newState.inputs, ...action.inputs }
			return newState
		default:
			return state
	}
}

export default sessionReducer
