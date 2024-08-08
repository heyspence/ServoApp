export const parseFormulaAndCalculatePrice = (formula, inputValues, basePrice) => {
	try {
		const formulaVariables = formula.match(/[A-Z_]+/g)

		const reqVariables = Object.keys(inputValues).filter((input) => !inputValues[input].recurring)

		// Check if all reqInputKeys are present in formulaVariables
		const isMissingReqVariables = reqVariables.some(
			(variable) => !formulaVariables.includes(variable),
		)
		if (isMissingReqVariables) return null

		// Replace variables in the formula with corresponding values
		let parsedFormula = formula
		formulaVariables.forEach((variable) => {
			const regex = new RegExp(variable, 'g')
			parsedFormula = parsedFormula.replace(regex, inputValues[variable].value)
		})

		const finalPrice = eval(parsedFormula)

		return Math.max(basePrice, finalPrice)
	} catch (error) {
		console.log('Error during parsing or evaluation:', error)
		return null
	}
}
