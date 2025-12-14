// seed.js - CommonJS 版本，直接用 node 執行
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 開始填充資料庫...\n');

  // 1. 建立用戶帳號
  console.log('📝 建立用戶帳號...');
  const adminPassword = await bcrypt.hash('admin1234', 10);
  const managerPassword = await bcrypt.hash('manager1234', 10);
  const viewerPassword = await bcrypt.hash('viewer1234', 10);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password_hash: adminPassword,
      name: 'Admin User',
      emailVerified: new Date(),
    },
  });

  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@example.com' },
    update: {},
    create: {
      email: 'manager@example.com',
      password_hash: managerPassword,
      name: 'Manager User',
      emailVerified: new Date(),
    },
  });

  const viewerUser = await prisma.user.upsert({
    where: { email: 'viewer@example.com' },
    update: {},
    create: {
      email: 'viewer@example.com',
      password_hash: viewerPassword,
      name: 'Viewer User',
      emailVerified: new Date(),
    },
  });

  // 新增其他真實用戶
  const customers = [
    { email: 'john.doe@example.com', name: 'John Doe' },
    { email: 'jane.smith@example.com', name: 'Jane Smith' },
    { email: 'alice.johnson@example.com', name: 'Alice Johnson' },
  ];

  for (const customer of customers) {
    await prisma.user.upsert({
      where: { email: customer.email },
      update: {},
      create: {
        email: customer.email,
        password_hash: await bcrypt.hash('password123', 10),
        name: customer.name,
        emailVerified: new Date(),
      },
    });
  }

  // 2. 建立分類
  console.log('📂 建立商品分類...');
  const categoryData = [
    { name: 'Electronics', slug: 'electronics', is_active: true },
    { name: 'Collectibles', slug: 'collectibles', is_active: true },
    { name: 'Fashion', slug: 'fashion', is_active: true },
  ];

  const categories = {};
  for (const cat of categoryData) {
    categories[cat.slug] = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { is_active: cat.is_active },
      create: {
        name: cat.name,
        slug: cat.slug,
        is_active: cat.is_active,
      },
    });
  }

  // 3. 建立商品
  console.log('🛍️ 建立商品...');
  const productsData = [
    {
      name: 'Smartphone Pro',
      slug: 'smartphone-pro',
      price: 32990,
      stock_quantity: 25,
      description: '最新款旗艦智能手機，配備高性能處理器和5G支持',
      category_slug: 'electronics',
      is_active: true,
    },
    {
      name: 'Wireless Earbuds',
      slug: 'wireless-earbuds',
      price: 8990,
      stock_quantity: 50,
      description: '主動降噪無線耳機，續航15小時',
      category_slug: 'electronics',
      is_active: true,
    },
    {
      name: 'Vintage Watch',
      slug: 'vintage-watch',
      price: 15000,
      stock_quantity: 5,
      description: '1970年代瑞士製造古董手錶，全新狀態',
      category_slug: 'collectibles',
      is_active: true,
    },
    {
      name: 'Designer Handbag',
      slug: 'designer-handbag',
      price: 28000,
      stock_quantity: 8,
      description: '限量版設計師手袋，真皮材質',
      category_slug: 'fashion',
      is_active: true,
    },
    {
      name: 'Leather Jacket',
      slug: 'leather-jacket',
      price: 12990,
      stock_quantity: 15,
      description: '高級黑色皮夾克，舒適透氣',
      category_slug: 'fashion',
      is_active: true,
    },
    {
      name: 'Laptop Computer',
      slug: 'laptop-computer',
      price: 52990,
      stock_quantity: 10,
      description: '高效能筆記本電腦，適合工作和創意設計',
      category_slug: 'electronics',
      is_active: true,
    },
  ];

  const products = {};
  for (const prod of productsData) {
    const categoryId = categories[prod.category_slug].id;
    products[prod.slug] = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        price: prod.price,
        stock_quantity: prod.stock_quantity,
        is_active: prod.is_active,
      },
      create: {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        stock_quantity: prod.stock_quantity,
        description: prod.description,
        category_id: categoryId,
        is_active: prod.is_active,
      },
    });
  }

  // 4. 建立訂單和訂單項目
  console.log('📦 建立訂單...');
  const ordersData = [
    {
      order_number: 'ORD20250101001',
      user_email: 'john.doe@example.com',
      status: 'delivered',
      payment_status: 'paid',
      total_amount: 42980,
      items: [
        { product_slug: 'smartphone-pro', quantity: 1, unit_price: 32990 },
        { product_slug: 'wireless-earbuds', quantity: 1, unit_price: 8990 },
      ],
    },
    {
      order_number: 'ORD20250102001',
      user_email: 'jane.smith@example.com',
      status: 'shipped',
      payment_status: 'paid',
      total_amount: 28000,
      items: [
        { product_slug: 'designer-handbag', quantity: 1, unit_price: 28000 },
      ],
    },
    {
      order_number: 'ORD20250103001',
      user_email: 'alice.johnson@example.com',
      status: 'pending',
      payment_status: 'pending',
      total_amount: 65980,
      items: [
        { product_slug: 'laptop-computer', quantity: 1, unit_price: 52990 },
        { product_slug: 'wireless-earbuds', quantity: 1, unit_price: 8990 },
      ],
    },
    {
      order_number: 'ORD20250104001',
      user_email: 'john.doe@example.com',
      status: 'delivered',
      payment_status: 'paid',
      total_amount: 15000,
      items: [
        { product_slug: 'vintage-watch', quantity: 1, unit_price: 15000 },
      ],
    },
  ];

  for (const orderData of ordersData) {
    const user = await prisma.user.findUnique({
      where: { email: orderData.user_email },
    });

    if (user) {
      const order = await prisma.order.upsert({
        where: { order_number: orderData.order_number },
        update: {
          status: orderData.status,
          payment_status: orderData.payment_status,
          total_amount: orderData.total_amount,
        },
        create: {
          order_number: orderData.order_number,
          user_id: user.id,
          status: orderData.status,
          payment_status: orderData.payment_status,
          total_amount: orderData.total_amount,
          placed_at: new Date(),
        },
      });

      // 建立訂單項目
      for (const item of orderData.items) {
        const product = products[item.product_slug];
        if (product) {
          // 檢查是否已存在
          const existingItem = await prisma.orderItem.findFirst({
            where: {
              order_id: order.id,
              product_id: product.id,
            },
          });

          if (!existingItem) {
            await prisma.orderItem.create({
              data: {
                order_id: order.id,
                product_id: product.id,
                product_name: product.name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                subtotal_amount: item.quantity * item.unit_price,
              },
            });
          }
        }
      }
    }
  }

  // 5. 建立支付記錄
  console.log('💳 建立支付記錄...');
  const orders = await prisma.order.findMany({
    where: {
      NOT: {
        status: 'pending',
      },
    },
  });

  for (const order of orders) {
    // 檢查是否已存在支付記錄
    const existingPayment = await prisma.payment.findFirst({
      where: {
        order_id: order.id,
      },
    });

    if (!existingPayment) {
      await prisma.payment.create({
        data: {
          order_id: order.id,
          gateway: order.order_number.includes('ORD20250101') ? 'ECPay' : 'LINE Pay',
          amount: order.total_amount,
          currency: 'TWD',
          status: order.payment_status === 'paid' ? 'completed' : 'pending',
          paid_at: order.payment_status === 'paid' ? new Date() : null,
        },
      });
    }
  }

  console.log('\n✅ 資料庫填充完成！\n');
  console.log('📊 統計信息：');
  const userCount = await prisma.user.count();
  const productCount = await prisma.product.count();
  const orderCount = await prisma.order.count();
  const paymentCount = await prisma.payment.count();

  console.log(`  - 用戶數: ${userCount}`);
  console.log(`  - 商品數: ${productCount}`);
  console.log(`  - 訂單數: ${orderCount}`);
  console.log(`  - 支付記錄數: ${paymentCount}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
