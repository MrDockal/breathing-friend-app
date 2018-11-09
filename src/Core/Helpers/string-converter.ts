export const arrayBufferToString = (buff: ArrayBuffer) => {
	return String.fromCharCode.apply(null, new Uint16Array(buff));
}

export const stringToArrayBuffer = (str: string) => {
	const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	let bufView = new Uint16Array(buf);
	for (let i = 0, strLen=str.length; i < strLen; i++) {
	  bufView[i] = str.charCodeAt(i);
	}
	return buf;
}