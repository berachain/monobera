export const getBadgeContent = (tag: string) => {
	switch (tag) {
		case "hot":
			return "🔥";
		case "new":
			return "🚀";
		case "bgtRewards":
			return "🐝";
		default:
			return "";
	}
};
