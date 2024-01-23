import { Test, TestingModule } from "@nestjs/testing";
import { VideoEntity } from "../entities/video.entity";
import { VideoRepository } from "./video.repository";
import { PrismaService } from "../../prisma/prisma.service";

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
			findById: jest.fn().mockResolvedValue(videoEntityMock),
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
});