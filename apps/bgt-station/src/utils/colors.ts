const Colors = [
	"#FED0EE",
	"#FDD09F",
	"#DBAEFF",
	"#A9F4D0",
	"#FBE38E",
	"#D0E8FF",
];

export const getColors = (count: number) => {
	const result = [];
	for (let i = 0; i < count; i++) {
		result.push(Colors[i % Colors.length]);
	}
	return result;
};
