import { Controller, Get, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import e from 'express';
import { error } from 'console';


@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  async findAll() {
    const invoices = await this.invoicesService.findAll();
    if(invoices) {
      return invoices;
    } else {
      return [];
    }
  }

  @Get('total')
  async getTotal() {
    const aggregatedTotals = await this.invoicesService.getTotal();
    if(aggregatedTotals) {
      return aggregatedTotals;
    } else {
      return [];
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const invoice = await this.invoicesService.findOne(id);
    if(invoice) {
      return invoice;
    } else {
      return {error: 'Invoice not found'};
    }
  }

}
