import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Seed data for labels
  const labels = [
    { name: "bug", color: "#eb5757" },
    { name: "feature", color: "#BB87FC" },
    { name: "improvement", color: "#4EA7FC" },
    { name: "canceled", color: "#4EA7FC" },
  ];

  for (const label of labels) {
    await prisma.label.upsert({
      where: { name: label.name },
      update: {},
      create: label,
    });
  }

  // Seed data for labels
  const priorities = [
    { name: "no_priority", value: 0 },
    { name: "urgent", value: 1 },
    { name: "high", value: 2 },
    { name: "medium", value: 3 },
    { name: "low", value: 4 },
  ];

  for (const priority of priorities) {
    await prisma.priority.create({
      data: {
        name: priority.name,
        value: priority.value
      }
    });
  }

  // Seed data for users
  const users = [
    {
      first_name: "Admin",
      last_name: "Dev",
      full_name: "Admin Dev",
      email: "admin@example.com",
      password: await bcrypt.hash("password", 10),
      created_at: new Date(),
      username: "admindev",
      position: "Developer",
      language: null,
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Pegue todas as labels existentes
  const existingLabels = await prisma.label.findMany();

  // Pegar o admin
  const adminUser = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      created_at: true,
      username: true,
      position: true,
      language: true,
    },
  });

  // Verifica se o adminUser foi encontrado
  if (!adminUser) {
    throw new Error("Admin user not found");
  }

  // Dados do workspace
  const workspaceData = {
    name: "Meu Novo Workspace",
    creator: {
      connect: { id: adminUser.id },
    },
    url_key: "meu-novo-workspace",
    members: {
      create: {
        user: { connect: { id: adminUser.id } },
        permission: 'admin'
      },
    },
    labels: {
      create: existingLabels.map((label) => ({
        label: { connect: { id: label.id } },
      })),
    },
  };

  try {
    const newWorkspace = await prisma.workspace.create({
      data: workspaceData,
    });

    console.log("Novo Workspace criado:", newWorkspace);
  } catch (error) {
    console.error("Erro ao criar o workspace:", error);
  }
}

main()
  .then(() => {
    console.log("Seed data inserted");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
