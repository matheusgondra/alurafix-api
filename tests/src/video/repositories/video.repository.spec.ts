import { Test, TestingModule } from "@nestjs/testing";
import { VideoEntity } from "../../../../src/video/entities/video.entity";
import { VideoRepository } from "../../../../src/video/repositories/video.repository";
import { PrismaService } from "../../../../src/prisma/prisma.service";
import { CreateVideoDTO } from "../../../../src/video/dtos/create-video.dto";

describe("VideoRepository", () => {
	let videoRepository: VideoRepository;
	const videoEntityMock: VideoEntity = {
		id: "any_id",
		title: "any_title",
		description: "any_description",
		url: "any_url"
	};
	const prismaServiceMock = {
		video: {
			create: jest.fn().mockResolvedValue(videoEntityMock),
			findMany: jest.fn().mockResolvedValue([videoEntityMock]),
			findUnique: jest.fn().mockResolvedValue(videoEntityMock),
			update: jest.fn().mockResolvedValue(videoEntityMock),
			delete: jest.fn().mockResolvedValue(videoEntityMock)
		}
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VideoRepository,
				{ provide: PrismaService, useValue: prismaServiceMock }
			]
		}).compile();

		videoRepository = module.get<VideoRepository>(VideoRepository);
	});

	it("Should be defined", () => {
		expect(videoRepository).toBeDefined();
	});

	it("Should create a video", async () => {
		const createVideoDTO: CreateVideoDTO = {
			title: "any_title",
			description: "any_description",
			url: "any_url"
		};
		const video = await videoRepository.create(createVideoDTO);
		expect(video).toEqual(videoEntityMock);
	});

	it("Should find all videos", async () => {
		const videos = await videoRepository.findAll();
		expect(videos).toEqual([videoEntityMock]);
	});

	it("Should find a video by id", async () => {
		const video = await videoRepository.findById("any_id");
		expect(video).toEqual(videoEntityMock);
	});

	it("Should update a video", async () => {
		const video = await videoRepository.update("any_id", videoEntityMock);
		expect(video).toEqual(videoEntityMock);
	});

	it("Should delete a video", async () => {
		const video = await videoRepository.delete("any_id");
		expect(video).toEqual(videoEntityMock);
	});
});