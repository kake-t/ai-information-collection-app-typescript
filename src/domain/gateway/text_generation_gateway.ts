import type { TextGenerationRequest, TextGenerationResponse } from "../entities/text_generation";

export interface TextGenerationGateway {
	generateText(request: TextGenerationRequest): Promise<TextGenerationResponse>;
}
