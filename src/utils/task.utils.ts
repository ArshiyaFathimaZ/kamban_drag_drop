import { format, isBefore } from 'date-fns'
import type { Priority } from '../components/KanbanBoard/KanbanBoard.types'

export const isOverdue = (dueDate?: Date) => {
  if (!dueDate) return false
  return isBefore(dueDate, new Date())
}

export const formatDate = (date?: Date) => {
  if (!date) return ''
  return format(date, 'MMM dd, yyyy')
}

export const getInitials = (name: string) => {
  return name.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2)
}

export const getPriorityColor = (priority: Priority) => {
  const colors: Record<Priority, string> = {
    low: 'bg-blue-100 text-blue-700 border-l-4 border-blue-500',
    medium: 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500',
    high: 'bg-orange-100 text-orange-700 border-l-4 border-orange-500',
    urgent: 'bg-red-100 text-red-700 border-l-4 border-red-500'
  }
  return colors[priority] ?? colors.medium
}
