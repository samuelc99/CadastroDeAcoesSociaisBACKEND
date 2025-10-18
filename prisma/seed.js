import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.action.createMany({
    data: [
      {
        title: "",
        description: "",
        location: "",
        responsible: "",
        contact: "",
        link: ""
      },
      {
        title: "",
        description: "",
        location: "",
        responsible: "",
        contact: "",
        link: ""
      }
    ],
    skipDuplicates: true
  });

  console.log("Seed concluído!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
