import type { Config } from "jest";

const config: Config = {
	roots: ["./tests"],
	verbose: true,
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
};

export default config;
