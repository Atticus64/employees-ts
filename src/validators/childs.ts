
type errorsArray = { errors?: [ { msg: string } ]}

const isValidChilds = (hasChilds: boolean, childs?: number ) => {
	let errorsArray: errorsArray = {};
	let hasError = false;

	if (!hasChilds && !childs){
		return [errorsArray, hasError]
	}

	if (!childs) {
      errorsArray = {
				errors: [ { msg:'Property hasChilds is true but no childs in ths Employee' }]
			}
			hasError = true
			return [errorsArray, hasError]
  }

	if (!hasChilds && childs > 0) {
      errorsArray = {
				errors: [ { msg:'Property hasChilds is false but youre sending childs number' }]
			}
			hasError = true
  } else if (hasChilds && !childs || childs < 0){
      errorsArray = {
				errors: [ { msg:'Property hasChilds is true but no childs in ths Employee' }]
			}
			hasError = true
  }

	return [errorsArray, hasError]
}

export {
	isValidChilds
}

