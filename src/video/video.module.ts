import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { VideoRepository } from './repositories/video.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
	controllers: [VideoController],
	providers: [VideoService, VideoRepository, PrismaService]
})
export class VideoModule {}
