import { PrismaClient } from "@prisma/client";

// PrismaClient = DB 창고와 대화할 수 있는 유일한 전화기.
// 이 전화기를 여러 개 만들면(new PrismaClient()를 여기저기서 호출하면)
// 전화선(DB 커넥션)이 낭비됨. 딱 하나만 만들어서 앱 전체가 나눠 쓴다.
const prisma = new PrismaClient();

export default prisma;
