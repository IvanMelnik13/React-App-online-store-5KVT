const cleanObject = (object: { [key: string]: any }) => {
	const objectNew = { ...object }
	const objectNewKeys = Object.keys(objectNew).filter(key => objectNew[key as keyof typeof objectNew])
	Object.keys(objectNew).forEach(key => {
		if (objectNewKeys.indexOf(key) == -1) {
			delete objectNew[key as keyof typeof objectNew]
		}
	})
	return objectNew
}

export default cleanObject