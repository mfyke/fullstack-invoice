import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.invoice.findMany();
  }

  findOne(id: string) {
    return this.prisma.invoice.findUnique({ where: { id } });
  }

  getTotal() {
    // find the sum of all invoice amounts aggregated by date
    return this.prisma.invoice.groupBy({
      by: ['due_date'],
      _sum: {
        amount: true,
      },
    });
  }

}
