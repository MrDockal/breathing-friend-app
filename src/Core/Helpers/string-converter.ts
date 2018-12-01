export const arrayBufferToString = (buff: ArrayBuffer) => {
	return String.fromCharCode.apply(null, new Uint16Array(buff));
}

export const stringToArrayBuffer = (str: string) => {
	let bufView = [];
	for (let i = 0, strLen = str.length; i < strLen; i++) {
		bufView[i] = str.charCodeAt(i);
	}
	return bufView;
}
