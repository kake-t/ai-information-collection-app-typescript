interface AwsConfig {
	region: string;
}

interface TextGenerationApiConfig {
	key: string;
}

interface EmailConfig {
	source: string;
	destination: string;
}

interface Config {
	aws: AwsConfig;
	textGenerationApi: TextGenerationApiConfig;
	email: EmailConfig;
}

class ConfigurationRequiredError extends Error {
	constructor(key: string) {
		super(`環境変数 ${key} が設定されていません`);
		this.name = "ConfigurationRequiredError";
	}
}

class InvalidIntegerFormatError extends Error {
	constructor(key: string, value: string) {
		super(`環境変数 ${key} は有効な整数ではありません: ${value}`);
		this.name = "InvalidIntegerFormatError";
	}
}

function getEnvVar(key: string): string {
	const value = process.env[key];
	if (value === undefined) {
		throw new ConfigurationRequiredError(key);
	}
	return value;
}

function getEnvInt(key: string): number {
	const value = getEnvVar(key);
	const num = Number.parseInt(value, 10);
	if (Number.isNaN(num)) {
		throw new InvalidIntegerFormatError(key, value);
	}
	return num;
}

export let config: Config = getConfig();

function getConfig(): Config {
	if (config) {
		return config;
	}

	const awsConfig: AwsConfig = {
		region: getEnvVar("AWS_REGION"),
	};

	const textGenerationApiConfig: TextGenerationApiConfig = {
		key: getEnvVar("PERPLEXITY_API_KEY"),
	};

	const emailConfig: EmailConfig = {
		source: getEnvVar("EMAIL_SOURCE"),
		destination: getEnvVar("EMAIL_DESTINATION"),
	};

	config = {
		aws: awsConfig,
		textGenerationApi: textGenerationApiConfig,
		email: emailConfig,
	};

	return config;
}
