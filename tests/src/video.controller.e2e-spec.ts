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

	it("Should find all videos", async () => {
		const appServer = app.getHttpServer();
		await request(appServer)
			.post("/videos")
			.send({
				title: "any_title",
				description: "any_description",
				url: "http://anyurl.com"
			});
		
		const response = await request(appServer)
			.get("/videos")
			.expect(200);
		
		expect(response.body).toEqual([
			{
				id: expect.any(String),
				title: "any_title",
				description: "any_description",
				url: "http://anyurl.com"
			}
		]);
	});

	it("Should find a video by id", async () => {
		const appServer = app.getHttpServer();
		const video = await request(appServer)
			.post("/videos")
			.send({
				title: "any_title",
				description: "any_description",
				url: "http://anyurl.com"
			});

		const response = await request(appServer)
			.get(`/videos/${video.body.id}`)
			.expect(200);

		expect(response.body).toEqual({
			id: video.body.id,
			title: "any_title",
			description: "any_description",
			url: "http://anyurl.com"
		});
	});
});