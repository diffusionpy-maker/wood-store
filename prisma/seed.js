// seed.js - CommonJS 版本，直接用 node 執行
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 1. 建立三種身分帳號（admin/manager/viewer）
  // 後台帳號（可登入 /admin-login）：
  //   admin@example.com / admin1234
  //   manager@example.com / manager1234
  // 前台帳號（可登入 /login）：
  //   viewer@example.com / viewer1234

  const adminPassword = await bcrypt.hash('admin1234', 10);
  const managerPassword = await bcrypt.hash('manager1234', 10);
  const viewerPassword = await bcrypt.hash('viewer1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
      name: 'Admin User',
    },
  });
  await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      password: managerPassword,
      role: 'manager',
      name: 'Manager User',
    },
  });
  await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      email: 'viewer@example.com',
      password: viewerPassword,
      role: 'viewer',
      name: 'Viewer User',
    },
  });

  // 2. 建立三個分類（Electronics, Collectibles, Fashion）
  const categories = ['Electronics', 'Collectibles', 'Fashion'];
  for (const categoryName of categories) {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: categoryName,
        slug,
      },
    });
  }

  // 3. 在 Electronics 分類下建立一個商品
  const electronics = await prisma.category.findUnique({ where: { slug: 'electronics' } });
  if (electronics) {
    await prisma.product.upsert({
      where: { slug: 'smartphone-pro' },
      update: {},
      create: {
        name: 'Smartphone Pro',
        slug: 'smartphone-pro',
        price: 32990,
        description: 'Flagship smartphone with auction-ready packaging.',
        stock: 25,
        categoryId: electronics.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
