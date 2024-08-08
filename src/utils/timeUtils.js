// import { toDate, format } from 'date-fns-tz';

// const convertToMountainTime = (calendarData) => {
//     const convertTimezone = (dateStr, targetTimezone) => {
//         const utcDate = toDate(dateStr); // Parse the ISO date string to a Date object
//         const convertedDate = new Date(utcDate.toLocaleString('en-US', { timeZone: targetTimezone })); // Convert to the target timezone
//         const convertedDateFormatted = format(convertedDate, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"); // Format to match original dateStr format without timezone
//         return convertedDateFormatted;
//     };

//     return calendarData?.map(item => {
//         const formattedMountainDate = convertTimezone(item.start_time, 'America/Denver');
//         return {
//             ...item,
//             start_time: formattedMountainDate
//         };
//     });
// };

// export { convertToMountainTime };

// import { parseISO, format } from 'date-fns';

const stripTimeZone = (calendarData) => {
	const stripTimezone = (dateStr) => {
		const date = parseISO(dateStr) // Parse the ISO date string to a Date object
		const formattedDate = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS") // Format without timezone
		return formattedDate
	}

	return calendarData?.map((item) => {
		const formattedDate = stripTimezone(item.start_time)
		return {
			...item,
			start_time: formattedDate,
		}
	})
}

export { stripTimeZone }
