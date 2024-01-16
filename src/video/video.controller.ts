import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDTO } from "./dtos/create-video.dto";
import { VideoEntity } from "./entities/video.entity";
import { UpdateVideoDTO } from "./dtos/update-video-dto";

@Controller("videos")
export class VideoController {
	constructor(private readonly videoService: VideoService) {}

	@Post()
	async create(@Body() createVideoDTO: CreateVideoDTO): Promise<VideoEntity> {
		return await this.videoService.create(createVideoDTO);
	}

	@Get()
	async findAll(): Promise<VideoEntity[]> {
		return await this.videoService.findAll();
	}

	@Get(":id")
	async findById(@Param("id") id: string): Promise<VideoEntity> {
		return await this.videoService.findById(id);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateVideoDTO: UpdateVideoDTO): Promise<VideoEntity> {
		return await this.videoService.update(id, updateVideoDTO);
	}
}
