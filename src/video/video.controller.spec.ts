import { Test, TestingModule } from "@nestjs/testing";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { PrismaService } from "../prisma/prisma.service";
import { VideoRepository } from "./repositories/video.repository";

describe("VideoController", () => {
	let controller: VideoController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VideoController],
			providers: [
				VideoService,
				PrismaService,
				VideoRepository
			]
		}).compile();

		controller = module.get<VideoController>(VideoController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
