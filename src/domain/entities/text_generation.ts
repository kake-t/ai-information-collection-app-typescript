const DEFAULT_MAX_TOKENS = 1000;
const DEFAULT_TEMPERATURE = 0.7;

class TextGenerationRequest {
	constructor(
		readonly prompt: string,
		readonly max_tokens: number = DEFAULT_MAX_TOKENS,
		readonly temperature: number = DEFAULT_TEMPERATURE,
	) {}
}
class TextGenerationResponse {
	constructor(
		readonly generated_text: string,
		readonly token_count: number,
	) {}
}
