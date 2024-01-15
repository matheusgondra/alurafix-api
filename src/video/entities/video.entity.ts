import { Video } from "@prisma/client";

export class VideoEntity implements Video {
	id: string;
	title: string;
	description: string;
	url: string;
}
