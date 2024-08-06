export const formatPhoneNumber = (phoneNumber) => {
    return (
        '(' +
        phoneNumber?.slice(0, 3) +
        ') ' +
        phoneNumber?.slice(3, 6) +
        '-' +
        phoneNumber?.slice(6, 10)
    );
};

export const formatAddress = (userAddress) => {
    if (!!userAddress) {
        return (
            <>
                {userAddress?.streetAddress}&nbsp;{userAddress?.city},&nbsp;
                {userAddress?.state}&nbsp;{userAddress?.zipCode}
            </>
        );
    } else {
        return <></>;
    }
};

export const formatDuration = (decimal) => {
    let hours;
    let minutes;

    hours = decimal - (decimal % 1);
    minutes = Math.round((60 * (decimal % 1)) / 5) * 5;

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m`;
    } else if (hours > 0 && minutes === 0) {
        return `${hours}${hours > 1 ? 'hrs' : 'hr'}`;
    } else {
        return `${minutes}mins`;
    }
};

export const formatDate = (originalDate) => {
    const date = new Date(originalDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export const formatDurationLong = (decimal) => {
    let hours;
    let minutes;

    hours = decimal - (decimal % 1);
    minutes = Math.round((60 * (decimal % 1)) / 5) * 5;

    if (hours > 0 && minutes > 0) {
        return `${hours} Hours ${minutes} Minutes`;
    } else if (hours > 0 && minutes === 0) {
        return `${hours}${hours > 1 ? ' Hours' : ' Hour'}`;
    } else {
        return `${minutes} Minutes`;
    }
};

export const toSnakeCase = (str) => str.replace(/\s+/g, '_').toLowerCase();

export const snakeToTitleCase = (snakeString) => {
    return snakeString
        ?.split('_')
        .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ');
};

const toCamel = (str) => {
    return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace('-', '').replace('_', '');
    });
};

export const keysToCamel = (obj) => {
    if (isObject(obj)) {
        const n = {};

        Object.keys(obj).forEach((k) => {
            n[toCamel(k)] = keysToCamel(obj[k]);
        });

        return n;
    } else if (Array.isArray(obj)) {
        return obj.map((i) => {
            return keysToCamel(i);
        });
    }

    return obj;
};

function isObject(obj) {
    return (
        obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
    );
}

export const parsedCategory = (category) => {
    switch (category) {
        case 'house_cleaning':
            return 'House Cleaning';
        case 'pest_control':
            return 'Pest Control';
        case 'auto_detailing':
            return 'Car Detailing';
        case 'carpet_cleaning':
            return 'Carpet Cleaning';
        case 'window_cleaning':
            return 'Window Cleaning';
        case 'garbage_can_cleaning':
            return 'Garbage Can Cleaning';
        default:
            return `Unrecognized category: ${category}`;
    }
};

export const capitalizeFirstLetter = (word) => {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
};
