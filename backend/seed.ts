import { PrismaClient } from '@prisma/client';

import { selectAllWorkspaceLabel } from './src/models/workspace/workspace-label';
import {
  createLabel,
  createPriorities,
  createEstimatives,
  createUser,
} from './src/seeds';
import { MemberPermission } from './src/utils/member-permission';

const prisma = new PrismaClient();

async function main() {
  // Seed data for labels
  await createLabel();
  // Seed data for labels
  await createPriorities();

  // Seed data for estimatives
  await createEstimatives();

  // Seed data for users
  await createUser();

  // Pegue todas as labels existentes
  const existingLabels = await prisma.label.findMany();

  // Pegar o admin
  const adminUser = await prisma.user.findUnique({
    where: {
      email: 'admin@example.com',
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
    throw new Error('Admin user not found');
  }

  // Dados do workspace
  const workspaceData = {
    name: 'Meu Novo Workspace',
    creator: {
      connect: { id: adminUser.id },
    },
    url_key: 'meu-novo-workspace',
    members: {
      create: {
        user: { connect: { id: adminUser.id } },
        permission: MemberPermission.ADMIN,
      },
    },
    labels: {
      create: existingLabels.map((label) => ({
        id: label.id,
        name: label.name,
        color: label.color,
        can_edit: false,
      })),
    },
  };

  try {
    const newWorkspace = await prisma.workspace.create({
      data: workspaceData,
    });

    console.log('Novo Workspace criado:', newWorkspace);

    const WorkspaceLabels = await selectAllWorkspaceLabel(newWorkspace.id);

    const team = {
      name: 'My Team',
      identifier: 'MYT',
      creator: {
        connect: { id: adminUser.id },
      },
      workspace_id: newWorkspace.id,
      members: {
        create: {
          user: { connect: { id: adminUser.id } },
          permission: 'admin',
        },
      },
      labels: {
        create: WorkspaceLabels.map((label) => ({
          id: label.id,
          name: label.name,
          color: label.color,
          can_edit: false,
        })),
      },
      estimates_type: null,
    };

    const newTeam = await prisma.team.create({
      data: team,
    });

    console.log(newTeam);
  } catch (error) {
    console.error('Erro ao criar o workspace:', error);
  }
}

main()
  .then(() => {
    console.log('Seed data inserted');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
