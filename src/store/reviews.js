import { closeModal } from './ui';
import csrfFetch from './csrf';

const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';

const receiveReviews = (reviews) => ({
    type: RECEIVE_REVIEWS,
    reviews,
});

const receiveReview = (review) => ({
    type: RECEIVE_REVIEW,
    review,
});

const removeReview = (reviewId) => ({
    type: REMOVE_REVIEW,
    reviewId,
});

export const fetchReviews = (vendor_id) => async (dispatch) =>  {
    const res = await fetch(`/api/vendors/${vendor_id}/reviews`);

    if  (res.ok)  {
        const data = await res.json();
        dispatch(receiveReviews(data.reviews));
    }
};

export const createReview = (vendorId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/vendors/${vendorId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
    });

    const data = await res.json();

    if  (res.ok)  {
        dispatch(receiveReview(data.review));
        dispatch(closeModal());
    } else {
        console.log(data.errors);
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok)  {
        dispatch(removeReview(reviewId));
    } else {
        console.log(data.errors);
    }

    dispatch(closeModal());
};

const reviewsReducer = (state = {}, action) => {
    let newState = { ...state };
    switch (action.type) {
        case RECEIVE_REVIEWS:
            return { ...action.reviews };
        case RECEIVE_REVIEW:
            return { ...newState, [action.review.id]: action.review };
        case REMOVE_REVIEW:
            delete newState[action.reviewId];
            return newState;
        case UPDATE_REVIEW:
            return {};
        default:
            return newState;
    }
};

export default reviewsReducer;
