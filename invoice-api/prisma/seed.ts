import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test123@mail.com" },
    update: {},
    create: {
      email: "test123@mail.com",
      name: "Test User",
      password: "password",
    },
  });

  console.log({ user });

  const invoice1 = await prisma.invoice.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      vendor_name: "Amazon",
      amount: 100.25,
      due_date: new Date("2025-05-12T23:50:21.817Z"),
      description: "Purchases",
      user_id: "abc",
      paid: false,
    },
  });

  const invoice2 = await prisma.invoice.upsert({
    where: { id: "2" },
    update: {},
    create: {
      id: "2",
      vendor_name: "Costco",
      amount: 500,
      due_date: new Date("2025-07-12T23:50:21.817Z"),
      description: "Purchases",
      user_id: "cde",
      paid: true,
    },
  });

  const invoice3 = await prisma.invoice.upsert({
    where: { id: "3" },
    update: {},
    create: {
      id: "3",
      vendor_name: "Home Depot",
      amount: 225.75,
      due_date: new Date("2025-07-12T23:50:21.817Z"),
      description: "Rental",
      user_id: "efg",
      paid: false,
    },
  });

  const invoice4 = await prisma.invoice.upsert({
    where: { id: "4" },
    update: {},
    create: {
      id: "4",
      vendor_name: "US Foods",
      amount: 465,
      due_date: new Date("2025-08-12T23:50:21.817Z"),
      description: "Purchases",
      user_id: "abc",
      paid: true,
    },
  });

  const invoice5 = await prisma.invoice.upsert({
    where: { id: "5" },
    update: {},
    create: {
      id: "5",
      vendor_name: "Sysco",
      amount: 600,
      due_date: new Date("2025-05-12T23:50:21.817Z"),
      description: "Purchases",
      user_id: "ghi",
      paid: false,
    },
  });

  const invoice6 = await prisma.invoice.upsert({
    where: { id: "6" },
    update: {},
    create: {
      id: "6",
      vendor_name: "Ikea",
      amount: 678.36,
      due_date: new Date("2025-08-12T23:50:21.817Z"),
      description: "Purchases",
      user_id: "def",
      paid: true,
    },
  });

  console.log({ invoice1, invoice2, invoice3, invoice4, invoice5, invoice6 });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
