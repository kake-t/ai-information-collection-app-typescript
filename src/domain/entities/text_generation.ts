export const DEFAULT_MAX_TOKENS = 1000;
export const DEFAULT_TEMPERATURE = 0.7;

export class TextGenerationRequest {
	constructor(
		readonly prompt: string,
		readonly maxTokens: number = DEFAULT_MAX_TOKENS,
		readonly temperature: number = DEFAULT_TEMPERATURE,
	) {}
}
export class TextGenerationResponse {
	constructor(
		readonly generatedText: string,
		readonly tokenCount: number,
	) {}
}
