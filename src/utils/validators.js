export const isValidPhoneNumber = (phoneNumber) => {
	// Regular expression for a typical 10-digit North American phone number
	const phonePattern = /^\s*\d{10}\s*$/ // Allow white space before and after the phone number
	return phonePattern.test(phoneNumber)
}

export const isValidEmail = (email) => {
	// Regular expression for basic email validation
	const emailPattern = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/ // Allow white space before and after the email
	return emailPattern.test(email)
}
