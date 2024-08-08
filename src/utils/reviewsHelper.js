export const getServoNameColor = (review, formattedAuthor) => {
	if (review.reviewType === 'google' && review.authorImg) return null

	const letters = 'abcdefghijklmnopqrstuvwxyz'
	const pos = letters.indexOf(formattedAuthor[0].toLowerCase())

	if (pos < 3) return 'rgb(0, 131, 138)'
	else if (pos >= 3 && pos < 7) return 'rgb(0, 131, 138)'
	else if (pos >= 7 && pos < 11) return 'rgb(91, 193, 196)'
	else if (pos >= 11 && pos < 17) return 'rgb(235 22 0)'
	else if (pos >= 17 && pos < 21) return 'rgb(246 187 239)'
	else return '#39ced7'
}
