export const wait = (ms: number) => {
	return new Promise((resolve: () => void) => {
		setTimeout(resolve, ms);
	});
}
