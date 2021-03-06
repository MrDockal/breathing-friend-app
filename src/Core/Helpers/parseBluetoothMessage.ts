import { Buffer } from "buffer";

export const parseBluetoothMessage = (data: ArrayBuffer | number[]) => {
	const buffer = Buffer.from(new Uint8Array(data) as any);
	const str = buffer.toString('utf8');
	return JSON.parse(str);
}
