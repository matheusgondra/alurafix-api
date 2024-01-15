import { IsNotEmpty, IsString, IsUrl } from "class-validator";
export class CreateVideoDTO {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsString()
	@IsNotEmpty()
	@IsUrl()
	url: string;
}
