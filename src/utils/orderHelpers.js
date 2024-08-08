export const getStatusColor = (status) => {
	const statusColorMap = {
		collected: 'var(--primary-blue)',
		processed: 'var(--primary-green)',
		refunded: 'var(--primary-red)',
		partially_refunded: 'var(--primary-yellow)',
		unfulfilled: 'var(--primary-blue)',
		fulfilled: 'var(--primary-green)',
		rescheduled: 'var(--primary-yellow)',
		cancelled: 'var(--primary-red)',
	}

	return statusColorMap[status]
}

export const getAvailableActions = (paymentStatus, fulfillmentStatus, appointmentAt) => {
	const actionsMap = {
		'collected + unfulfilled': ['complete', 'reschedule', 'partial_refund', 'cancel'],
		'collected + rescheduled': ['complete', 'reschedule', 'partial_refund', 'cancel'],
		'partially_refunded + rescheduled': ['complete', 'reschedule', 'partial_refund', 'cancel'],
		'partially_refunded + unfulfilled': ['complete', 'reschedule', 'partial_refund', 'cancel'],
		'partially_refunded + fulfilled': ['partial_refund'],
		'collected + fulfilled': ['partial_refund'],
		// 'collected + disputed': ['partial_refund', 'cancel'],
		'collected + cancelled': [],
		'processed + fulfilled': [],
		'refunded + cancelled': [],
		'partially_refunded + cancelled': [],
		'pending + fulfilled': ['partial_refund'],
		'pending + disputed': ['partial_refund'],
	}

	// Combine the statuses to get the key
	const key = `${paymentStatus} + ${fulfillmentStatus}`
	const actions = actionsMap[key] || []

	// Get the current time
	const currentTime = new Date()

	// Parse the appointmentAt time
	const appointmentTime = new Date(appointmentAt)

	// If current time is before the appointmentAt time, remove the 'complete' action
	if (currentTime < appointmentTime) {
		return actions.filter((action) => action !== 'complete')
	}

	return actions
}
