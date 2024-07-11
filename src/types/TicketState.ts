import { Ticket } from './TicketDetails';

export type Distribution = 'open' | 'resolved' | 'inProgress' | 'onHold' | 'cancelled';

export interface TicketState {
    ticketList: Ticket[]
    ticketDistribution: Record<Distribution, number>
}