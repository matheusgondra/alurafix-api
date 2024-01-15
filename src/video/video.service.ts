import { Injectable } from '@nestjs/common';
import { VideoRepository } from './repositories/video.repository';
import { CreateVideoDTO } from './dtos/create-video.dto';
import { VideoEntity } from './entities/video.entity';

@Injectable()
export class VideoService {
	constructor(private readonly videoRepository: VideoRepository) {}

	async create(createVideoDTO: CreateVideoDTO): Promise<VideoEntity> {
		return this.videoRepository.create(createVideoDTO);
	}
}
