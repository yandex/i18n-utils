export const reduceCssValues = (values: string[]) => {
	const map = [
		[1, 0],
		[0, 2],
		[1, 3],
	];
	for (let x = values.length - 2; x >= 0; x--) {
		if (values[map[x][0]] !== values[map[x][1]]) {
			break;
		}
		values.pop();
	}
	return values;
};
