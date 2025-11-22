import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin1234', 10);

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password,
      role: UserRole.admin,
      name: 'Admin User'
    }
  });

  const categories = ['Electronics', 'Collectibles', 'Fashion'];
  for (const categoryName of categories) {
    const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: {
        name: categoryName,
        slug
      }
    });
  }

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
        categoryId: electronics.id
      }
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
