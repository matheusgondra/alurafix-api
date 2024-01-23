import { Test, TestingModule } from "@nestjs/testing";
import { VideoEntity } from "./entities/video.entity";
import { VideoRepository } from "./repositories/video.repository";
import { VideoService } from "./video.service";
import { CreateVideoDTO } from "./dtos/create-video.dto";

describe("VideoService", () => {
	let service: VideoService;
	let videoEntityMock: VideoEntity;

	beforeEach(async () => {
		const repositoryMock = {
			create: jest.fn().mockResolvedValue(Promise.resolve(videoEntityMock)),
			findAll: jest.fn().mockResolvedValue(Promise.resolve([videoEntityMock])),
			findById: jest.fn().mockResolvedValue(Promise.resolve(videoEntityMock)),
			update: jest.fn().mockResolvedValue(Promise.resolve(videoEntityMock)),
			delete: jest.fn().mockResolvedValue(Promise.resolve(videoEntityMock))
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{ provide: VideoRepository, useValue: repositoryMock },
				VideoService
			]
		}).compile();

		service = module.get<VideoService>(VideoService);
	});

	it("Should be defined", () => {
		expect(service).toBeDefined();
	});

	it("Should create a video", async () => {
		const createVideoDTO: CreateVideoDTO = {
			title: "any_title",
			description: "any_description",
			url: "any_url"
		};
		const video = await service.create(createVideoDTO);
		expect(video).toEqual(videoEntityMock);
	});
});
