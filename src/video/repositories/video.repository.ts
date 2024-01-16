import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVideoDTO } from "../dtos/create-video.dto";
import { VideoEntity } from "../entities/video.entity";
import { UpdateVideoDTO } from "../dtos/update-video-dto";

@Injectable()
export class VideoRepository {
	constructor(private readonly prisma: PrismaService) {}

	async create(createVideoDTO: CreateVideoDTO): Promise<VideoEntity> {
		const videoCreated = await this.prisma.video.create({ data: createVideoDTO });
		return videoCreated;
	}

	async findAll(): Promise<VideoEntity[]> {
		const videos = await this.prisma.video.findMany();
		return videos;
	}

	async findById(id: string): Promise<VideoEntity> {
		const video = await this.prisma.video.findUnique({ where: { id } });
		return video;
	}

	async update(id: string, updateVideoDTO: UpdateVideoDTO): Promise<VideoEntity> {
		const videoUpdated = await this.prisma.video.update({ where: { id }, data: updateVideoDTO });
		return videoUpdated;
	}

	async delete(id: string): Promise<VideoEntity> {
		return await this.prisma.video.delete({ where: { id } });
	}
}
