-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "WorkingServiceStatus" AS ENUM ('DONE', 'ERROR', 'WORKING');

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "blob" BYTEA NOT NULL,
    "is_right" BOOLEAN NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_logs" (
    "id" SERIAL NOT NULL,
    "time_code" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "test_result_id" INTEGER NOT NULL,

    CONSTRAINT "event_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "blob" BYTEA NOT NULL,
    "test_id" INTEGER NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score_comparisons" (
    "letter" TEXT NOT NULL,
    "digit" DOUBLE PRECISION NOT NULL,
    "start" INTEGER NOT NULL,
    "end" INTEGER NOT NULL,

    CONSTRAINT "score_comparisons_pkey" PRIMARY KEY ("letter")
);

-- CreateTable
CREATE TABLE "sessions_keys" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "sessions_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "minutes_to_test" INTEGER NOT NULL DEFAULT 50,
    "questions_per_test" INTEGER NOT NULL DEFAULT 25,
    "seconds_to_skip" INTEGER NOT NULL DEFAULT 3,
    "event_logging" BOOLEAN NOT NULL DEFAULT false,
    "face_check" BOOLEAN NOT NULL DEFAULT false,
    "voice_recording" BOOLEAN NOT NULL DEFAULT false,
    "is_testing_started" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "iin" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "group_id" INTEGER NOT NULL,
    "student_photo_id" INTEGER,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_answers" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "answerId" INTEGER NOT NULL,

    CONSTRAINT "students_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students_photos" (
    "id" SERIAL NOT NULL,
    "blob" BYTEA,

    CONSTRAINT "students_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_results" (
    "id" SERIAL NOT NULL,
    "added_at" TIMESTAMP(3) NOT NULL,
    "digit" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "file_name" TEXT,
    "student_id" INTEGER NOT NULL,
    "test_id" INTEGER NOT NULL,

    CONSTRAINT "test_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "voice_records" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "test_result_id" INTEGER NOT NULL,

    CONSTRAINT "voice_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "working_services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "error" TEXT,
    "status" "WorkingServiceStatus" NOT NULL,

    CONSTRAINT "working_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToTest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_keys_key_key" ON "sessions_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "students_answers_studentId_answerId_key" ON "students_answers"("studentId", "answerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToTest_AB_unique" ON "_GroupToTest"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToTest_B_index" ON "_GroupToTest"("B");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_logs" ADD CONSTRAINT "event_logs_test_result_id_fkey" FOREIGN KEY ("test_result_id") REFERENCES "test_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_student_photo_id_fkey" FOREIGN KEY ("student_photo_id") REFERENCES "students_photos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_answers" ADD CONSTRAINT "students_answers_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students_answers" ADD CONSTRAINT "students_answers_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_results" ADD CONSTRAINT "test_results_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "voice_records" ADD CONSTRAINT "voice_records_test_result_id_fkey" FOREIGN KEY ("test_result_id") REFERENCES "test_results"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTest" ADD CONSTRAINT "_GroupToTest_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToTest" ADD CONSTRAINT "_GroupToTest_B_fkey" FOREIGN KEY ("B") REFERENCES "tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
