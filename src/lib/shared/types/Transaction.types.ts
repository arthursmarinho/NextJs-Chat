import {$Enums as PrismaEnum} from "@prisma/client";

export interface TransactionQueryRawFilters {
  accountId?: number;
  billableEndDate?: Date;
  billableStartDate?: Date;
  endDate?: string;
  hasTags?: boolean;
  id?: number;
  or?: TransactionQueryRawFilters[];
  paymentMethod?: PrismaEnum.PaymentMethodEnum[];
  pendingOnly?: boolean;
  placeholderOnly?: boolean;
  repeatOnly?: boolean;
  startDate?: string;
  type?: PrismaEnum.TransactionTypeEnum[];
}
