import {CalculatedBalance, CalculatedCreditCardBill} from "@prisma/client";

export interface CalculatedValuesOverview {
  currentAmount: number;
  endBalance: number;
  startBalance: number;
}

export interface AccountBalance {
  balance: number;
  id: number;
}

export interface CalculateValueJob {
  accountId: number;
  endDate: Date;
  startDate: Date;
}

export type CalculatedValue = CalculatedBalance | CalculatedCreditCardBill;
