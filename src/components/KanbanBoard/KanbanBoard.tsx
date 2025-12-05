import React, { useCallback, useState } from 'react'
import type { KanbanViewProps } from './KanbanBoard.types'
import { KanbanColumn } from './KanbanColumn'
import { useDragAndDrop } from '../../hooks/useDragAndDrop'
import { TaskModal } from './TaskModal'

export const KanbanBoard: React.FC<KanbanViewProps> = (props) => {
  const { columns, tasks } = props
  const [openTask, setOpenTask] = useState<string | null>(null)
  const { dragState, handleDragStart, handleDragOver, handleDrop, handleDragEnd } = useDragAndDrop()

  const onOpenTask = useCallback((task) => setOpenTask(task.id), [])
  const onClose = useCallback(() => setOpenTask(null), [])

  return (
    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6">
      {columns.map((col, colIndex) => {
        const colTasks = col.taskIds.map(id => props.tasks[id]).filter(Boolean)
        return (
          <div
            key={col.id}
            className="snap-start"
            onDragOver={(e) => { e.preventDefault() }}
          >
            <KanbanColumn
              column={col}
              columnIndex={colIndex}
              tasks={colTasks}
              onOpenTask={(task) => onOpenTask(task)}
              onDragOver={(e, index) => handleDragOver(e, { columnId: col.id, index })}
              onDrop={(e, index) => handleDrop(e, { columnId: col.id, index }, props.onTaskMove)}
              onDragStart={(e, taskId) => handleDragStart(e, { taskId, fromColumn: col.id })}
              onDragEnd={() => handleDragEnd()}
            />
          </div>
        )
      })}

      {openTask && (
        <TaskModal
          task={props.tasks[openTask]}
          onClose={onClose}
          onUpdate={(updates) => { props.onTaskUpdate(openTask, updates); onClose() }}
          onDelete={() => { props.onTaskDelete(openTask); onClose() }}
          columns={columns}
        />
      )}
    </div>
  )
}
