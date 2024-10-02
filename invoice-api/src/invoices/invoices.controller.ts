import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const invoices = await this.invoicesService.findAll();
    if(invoices) {
      return invoices;
    } else {
      return [];
    }
  }

  @Get('total')
  @UseGuards(JwtAuthGuard)
  async getTotal() {
    const aggregatedTotals = await this.invoicesService.getTotal();
    if(aggregatedTotals) {
      return aggregatedTotals;
    } else {
      return [];
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);
    if(invoice) {
      return invoice;
    } else {
      return {error: 'Invoice not found'};
    }
  }

}
