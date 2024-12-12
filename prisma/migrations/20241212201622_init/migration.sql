-- CreateTable
CREATE TABLE "VisitorData" (
    "id" SERIAL NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "geoData" JSONB,
    "clientData" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorData_pkey" PRIMARY KEY ("id")
);
