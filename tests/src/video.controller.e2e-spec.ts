import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { PrismaService } from "../../src/prisma/prisma.service";
import { VideoRepository } from "../../src/video/repositories/video.repository";
import { VideoController } from "../../src/video/video.controller";
import { VideoService } from "../../src/video/video.service";
import { PrismaHelper } from "../helpers/prisma-helper";

describe("VideoController", () => {
	let app: INestApplication;

	beforeEach(async () => {
		await PrismaHelper.connect();
		const module: TestingModule = await Test.createTestingModule({
			controllers: [VideoController],
			providers: [VideoService, VideoRepository, PrismaService]
		}).compile();

		app = module.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await PrismaHelper.disconnect();
	});

	it("Should create a video", async () => {
		await request(app.getHttpServer())
			.post("/videos")
			.send({
				title: "any_title",
				description: "any_description",
				url: "http://anyurl.com"
			})
			.expect(201);
	});
});