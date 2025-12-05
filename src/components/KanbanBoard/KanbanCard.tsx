import React, { memo, useMemo } from 'react'
import type { KanbanTask } from './KanbanBoard.types'
import { format, isBefore } from 'date-fns'
import { getInitials, getPriorityColor } from '../../utils/task.utils'

interface Props {
  task: KanbanTask
  onOpen: (task: KanbanTask) => void
  draggableProps?: {
    draggable?: boolean
    onDragStart?: (e: React.DragEvent) => void
    onDragEnd?: (e: React.DragEvent) => void
    onKeyDown?: (e: React.KeyboardEvent) => void
    tabIndex?: number
    ariaGrabbed?: boolean
  }
}

export const KanbanCard: React.FC<Props> = memo(({ task, onOpen, draggableProps }) => {
  const isOverdue = useMemo(() => task.dueDate ? isBefore(task.dueDate, new Date()) : false, [task.dueDate])
  const dueText = task.dueDate ? format(task.dueDate, 'MMM dd') : null
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Priority: ${task.priority ?? 'medium'}. Press Enter to open.`}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(task) }}
      onClick={() => onOpen(task)}
      className="bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer focus-visible:shadow-outline"
      {...(draggableProps as any)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">
          {task.title}
        </h4>
        {task.priority && (
          <span className={`text-xs px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-neutral-600 mb-2 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          {task.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {task.assignee ? (
            <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
              {getInitials(task.assignee)}
            </div>
          ) : null}
        </div>
      </div>

      {dueText && (
        <div className={`text-xs mt-2 ${isOverdue ? 'text-red-600' : 'text-neutral-500'}`}>
          Due: {dueText}
        </div>
      )}
    </div>
  )
})
KanbanCard.displayName = 'KanbanCard'
