import { Body, Controller, Post } from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDTO } from "./dtos/create-video.dto";
import { VideoEntity } from "./entities/video.entity";

@Controller("videos")
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Post()
	async create(@Body() createVideoDTO: CreateVideoDTO): Promise<VideoEntity> {
		return await this.videoService.create(createVideoDTO);
	}
}
