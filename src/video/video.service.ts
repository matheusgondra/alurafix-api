import { Injectable, NotFoundException } from "@nestjs/common";
import { VideoRepository } from "./repositories/video.repository";
import { CreateVideoDTO } from "./dtos/create-video.dto";
import { VideoEntity } from "./entities/video.entity";
import { UpdateVideoDTO } from "./dtos/update-video-dto";

@Injectable()
export class VideoService {
	constructor(private readonly videoRepository: VideoRepository) {}

	async create(createVideoDTO: CreateVideoDTO): Promise<VideoEntity> {
		return await this.videoRepository.create(createVideoDTO);
	}

	async findAll(): Promise<VideoEntity[]> {
		return await this.videoRepository.findAll();
	}

	async findById(id: string): Promise<VideoEntity> {
		const video = await this.videoRepository.findById(id);
		if (!video) {
			throw new NotFoundException("Video not found");
		}
		
		return video;
	}

	async update(id: string, updateVideoDTO: UpdateVideoDTO): Promise<VideoEntity> {
		await this.findById(id);
		return await this.videoRepository.update(id, updateVideoDTO);
	}
}
