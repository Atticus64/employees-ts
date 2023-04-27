
const isValidDate = async (birthDate: string): Promise<void> => {

	const yearString = birthDate.split('/').at(0)
	const year = Number(yearString)

	if (year < 1963) {
		throw new Error('year of the date cannot be older than 1963')
	} else if (year > 2005) {
		throw new Error('year cannot be newer than 2005')
	}

}


export {
	isValidDate
}

