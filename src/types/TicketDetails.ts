export interface Ticket {
    _id: string
    title: string
    description: string
    ticketPriority: number
    status: string
    assignedTo: string
    clientName: string
    assignee: string
    createdBy: string
    createdAt: string
    updatedAt: string
}

export interface TicketDetails {
    result: Ticket[]
}