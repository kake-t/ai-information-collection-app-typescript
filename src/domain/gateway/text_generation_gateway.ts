import type { TextGenerationRequest, TextGenerationResponse } from "../entities/text_generation";

export interface TextGenerationGateway {
	generate_text(request: TextGenerationRequest): Promise<TextGenerationResponse>;
}
