import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVideoDTO } from "../dtos/create-video.dto";
import { VideoEntity } from "../entities/video.entity";

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
}
