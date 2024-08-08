import { isValidEmail, isValidPhoneNumber } from '../validators';

export const handlePhoneNumberChange = (
    name,
    value,
    handleChange,
    setPhoneNumberError
) => {
    // Validate phone number as the user types
    if (value === '') {
        setPhoneNumberError('Phone number is required.');
    } else if (!isValidPhoneNumber(value)) {
        setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
        setPhoneNumberError('');
    }
    handleChange({ target: { name, value } });
};

export const handleEmailChange = (name, value, handleChange, setEmailError) => {
    // Validate email address as the user types
    if (value === '') {
        setEmailError('Email address is required.');
    } else if (!isValidEmail(value)) {
        setEmailError('Please enter a valid email address.');
    } else {
        setEmailError('');
    }
    handleChange({ target: { name, value } });
};

export const handleNextStep = (
    phoneNumber,
    setPhoneNumberError,
    email,
    setEmailError,
    nextStep
) => {
    // Validate phone number and email before proceeding to next step
    if (!isValidPhoneNumber(phoneNumber)) {
        setPhoneNumberError('Please enter a valid 10-digit phone number.');
        return;
    }
    if (!isValidEmail(email)) {
        setEmailError('Please enter a valid email address.');
        return;
    }
    nextStep(); // Proceed to next step if all validations pass
};
