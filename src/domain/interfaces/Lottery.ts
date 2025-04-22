import {Ticket} from './Ticket';

export interface Lottery {
  id: string;
  correlative: number;
  balance: number;
  status: boolean;
  dateRegister: Date;
  tickets: Array<Ticket>;
}
