-- CreateEnum
CREATE TYPE "TimelineEventSource" AS ENUM ('GITHUB', 'VERCEL', 'FIGMA', 'MANUAL');

-- AlterTable
ALTER TABLE "TimelineEvent" ADD COLUMN "source" "TimelineEventSource" NOT NULL DEFAULT 'MANUAL';
