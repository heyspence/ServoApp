import csrfFetch from './csrf'
import { receiveErrors } from './errors'

export const SET_ADDRESSES = 'addresses/SET_ADDRESSES'
const RECEIVE_ADDRESS = 'addresses/RECEIVE_ADDRESS'
const RECEIVE_USER_INPUTS = 'session/RECEIVE_USER_INPUTS'

export const setAddresses = (addresses) => ({
	type: SET_ADDRESSES,
	payload: addresses,
})

export const receiveAddress = (address) => ({
	type: RECEIVE_ADDRESS,
	payload: address,
})

export const receiveUserInputs = (userInputs, addressId) => ({
	type: RECEIVE_USER_INPUTS,
	payload: { userInputs, addressId },
})

export const getActiveAddress = (state) => {
	const addresses = state.addresses ? state.addresses : null

	if (addresses) {
		return Object.values(addresses).find((address) => address.default === true)
	}
}

export const createUserAddress = (address) => async (dispatch) => {
	const res = await csrfFetch(`/api/addresses`, {
		method: 'POST',
		body: JSON.stringify(address),
	})

	if (res.ok) {
		const data = await res.json()
		debugger
		dispatch(setAddresses(data.address))
	} else {
		console.log(res)
	}
}

export const updateUserAddress = (address, setEditMode) => async (dispatch) => {
	const res = await csrfFetch(`/api/addresses/${address.address.id}`, {
		method: 'PATCH',
		body: JSON.stringify(address),
	})

	const data = await res.json()

	if (res.ok) {
		dispatch(receiveAddress(data.address))
		setEditMode(false)
	} else {
		dispatch(receiveErrors(data.errors))
	}
}

export const updateUserInputs = (userInputs, addressId) => async (dispatch) => {
	const res = await csrfFetch(`/api/addresses/${addressId}/user_inputs`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({ userInputs }),
	})

	const data = await res.json()

	if (res.ok) {
		dispatch(receiveUserInputs(data.userInputs, addressId))
	} else {
		console.log(data.error)
	}
}

const addressesReducer = (state = {}, action) => {
	switch (action.type) {
		case SET_ADDRESSES:
			return { ...action.payload }
		case RECEIVE_ADDRESS:
			return { ...state, [action.payload.id]: action.payload }
		case RECEIVE_USER_INPUTS:
			const userInputs = action.payload.userInputs
			const addressId = action.payload.addressId
			const newState = { ...state, [addressId]: { ...state[addressId], userInputs } }
			return newState
		default:
			return state
	}
}

export default addressesReducer
