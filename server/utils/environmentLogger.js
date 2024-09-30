import colors from "colors";

export const logEnvironment = (ENVIRONMENT) => {
	if (ENVIRONMENT === "development") {
		console.log(colors.bgBrightRed(" Development Environment in USE "));
	} else if (ENVIRONMENT === "production") {
		console.log(colors.bgBrightRed(" Production Environment in USE "));
	}
};
