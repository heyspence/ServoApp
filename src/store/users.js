import csrfFetch from './csrf'
import { receiveErrors } from './errors'
import { setCurrentUser } from './session'
import { closeModal } from './ui'

export const updateUser = (userData, setEditMode) => async (dispatch) => {
	const res = await csrfFetch(`/api/users/${userData.id}`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'PATCH',
		body: JSON.stringify({ user: userData }),
	})

	let data = await res.json()

	if (res.ok) {
		dispatch(setCurrentUser(data.user))
		setEditMode(false)
	} else {
		dispatch(receiveErrors(data.errors))
	}
}

export const updatePassword = (updatePasswordData) => async (dispatch) => {
	const res = await csrfFetch(`/api/users/${updatePasswordData.userId}/update_password`, {
		headers: { 'Content-Type': 'application/json' },
		method: 'PATCH',
		body: JSON.stringify(updatePasswordData),
	})

	let data = await res.json()

	if (res.ok) {
		dispatch(closeModal())
	} else {
		dispatch(receiveErrors(data.errors))
	}
}
