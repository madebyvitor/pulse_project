-- AlterEnum
ALTER TYPE "FeedbackCategory" ADD VALUE 'NEW_INTEGRATION';

-- CreateEnum
CREATE TYPE "IntegrationProvider" AS ENUM ('GITHUB', 'VERCEL', 'FIGMA', 'SLACK');

-- CreateEnum
CREATE TYPE "IntegrationStatus" AS ENUM ('CONNECTED', 'DISCONNECTED');

-- CreateTable
CREATE TABLE "OrganizationIntegration" (
    "id" UUID NOT NULL,
    "organization_id" UUID NOT NULL,
    "provider" "IntegrationProvider" NOT NULL,
    "access_token" TEXT,
    "status" "IntegrationStatus" NOT NULL DEFAULT 'DISCONNECTED',
    "connected_at" TIMESTAMP(3),

    CONSTRAINT "OrganizationIntegration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationIntegration_organization_id_provider_key" ON "OrganizationIntegration"("organization_id", "provider");

-- AddForeignKey
ALTER TABLE "OrganizationIntegration" ADD CONSTRAINT "OrganizationIntegration_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
