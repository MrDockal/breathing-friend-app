
export interface Stack {
	[keyId: string]: number[];	
}

export class MessageStack {

	public stack: Stack;

	public addMessage(id: string, data: number[]) {
		let prevBytes: number[];
		try {
			prevBytes = [...this.stack[id]]
		} catch(e) {
			prevBytes = [];
		}
		this.stack = {
			...this.stack,
			[id]: [
				...prevBytes,
				...data
			]
		}
	}

	public isMessageComplete(id: string) {
		try {
			const stackLenght = this.stack[id].length;
			return (this.stack[id][stackLenght -1] === 0)
		} catch(e) {
			return false;
		}
	}

	public popCompletedMessage(id: string) {
		const message = this.stack[id];
		delete this.stack[id];
		return message.slice(0, message.length - 1);
	}
}