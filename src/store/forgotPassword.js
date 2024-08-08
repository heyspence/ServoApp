import csrfFetch from './csrf';
import { receiveErrors, removeErrors } from './errors';
import { setCurrentUser, setCurrentVendor, storeCurrentUser } from './session';
import { setHomeView } from './ui';

export const forgotPassword = (email, setSuccessMsg) => async (dispatch) => {
    const res = await csrfFetch(`/api/password/forgot`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(removeErrors());
        setSuccessMsg(data.message);
    } else {
        setSuccessMsg('');
        dispatch(receiveErrors(data.errors));
    }
};

export const resetPassword =
    (resetPasswordData, history) => async (dispatch) => {
        const res = await csrfFetch(`/api/password/reset`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(resetPasswordData),
        });

        const data = await res.json();

        if (res.ok) {
            dispatch(removeErrors());
            storeCurrentUser(data.user);
            dispatch(setCurrentUser(data.user));
            dispatch(setHomeView(data.user.userType));
            if (data.vendor) dispatch(setCurrentVendor(data.vendor));
            history.push('/password/reset/complete');
        } else {
            dispatch(receiveErrors(data.errors));
        }
    };

const forgotPasswordReducer = (state = {}, action) => {
    return state;
};

export default forgotPasswordReducer;
