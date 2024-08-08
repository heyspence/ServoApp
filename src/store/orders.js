// import consumer from '../channels/consumer';
import csrfFetch from './csrf';
import { receiveErrors } from './errors';
import { closeModal } from './ui';

const RECEIVE_ORDERS = 'orders/RECEIVE_ORDERS';
const RECEIVE_ORDER = 'orders/RECEIVE_ORDER';

// export const receiveOrders = (orders) => ({
//     type: RECEIVE_ORDERS,
//     orders,
// });

// const receiveOrder = (order) => ({
//     type: RECEIVE_ORDER,
//     order,
// });

// export const fetchOrderConfirmation = (confirmationId) => async (dispatch) => {
//     const subscription = consumer.subscriptions.create(
//         {
//             channel: 'OrderConfirmationChannel',
//             confirmation_id: confirmationId,
//         },
//         {
//             connected() {},
//             disconnected() {
//                 console.log(
//                     `Disconnected from OrderConfirmationChannel for confirmation ID ${confirmationId}`
//                 );
//             },
//             received(data) {
//                 dispatch(receiveOrder(data));
//                 subscription.unsubscribe();
//             },
//         }
//     );
// };

// export const rescheduleOrder = (order) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders/${order.id}/reschedule`, {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'PATCH',
//         body: JSON.stringify({ order }),
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveOrder({ [order.id]: data }));
//         dispatch(closeModal());
//     }
// };

// export const updateOrder = (order) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders/${order.id}`, {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'PATCH',
//         body: JSON.stringify({ order }),
//     });
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveOrder({ [order.id]: data }));
//     }
// };

// export const cancelOrder = (order, cancelReason) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders/${order.id}/cancel-order`, {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'PATCH',
//         body: JSON.stringify({ cancelReason: cancelReason }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//         dispatch(receiveOrder({ [order.id]: data }));
//         dispatch(closeModal());
//     } else {
//         if (data.errors) dispatch(receiveErrors(data.errors));
//     }
// };

// export const markAsComplete = (order, vendorId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/orders/${order.id}/mark-as-fulfilled`, {
//         headers: { 'Content-Type': 'application/json' },
//         method: 'PATCH',
//         body: JSON.stringify({ order, vendorId }),
//     });

//     if (res.ok) {
//         const data = await res.json();
//         dispatch(receiveOrder({ [order.id]: data }));
//         dispatch(closeModal());
//     }
// };

// export const createPartialRefund =
//     (orderId, refundAmount, refundReason) => async (dispatch) => {
//         const res = await csrfFetch(
//             `/api/orders/${orderId}/create-partial-refund`,
//             {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ refundAmount, refundReason }),
//             }
//         );

//         const data = await res.json();

//         if (res.ok) {
//             dispatch(receiveOrder({ [orderId]: data }));
//             dispatch(closeModal());
//         } else {
//             dispatch(receiveErrors(data.errors));
//         }
//     };

const ordersReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case RECEIVE_ORDERS:
            return { ...action.orders.orders };
        case RECEIVE_ORDER:
            return { ...newState, ...action.order };
        default:
            return newState;
    }
};

export default ordersReducer;
