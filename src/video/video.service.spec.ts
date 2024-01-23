import { Test, TestingModule } from "@nestjs/testing";
import { VideoService } from "./video.service";
import { PrismaService } from "../prisma/prisma.service";
import { VideoRepository } from "./repositories/video.repository";

describe("VideoService", () => {
	let service: VideoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [VideoRepository, PrismaService, VideoService]
		}).compile();

		service = module.get<VideoService>(VideoService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
