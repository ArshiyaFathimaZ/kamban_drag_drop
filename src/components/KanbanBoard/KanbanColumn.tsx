import React, { useMemo } from 'react'
import type { KanbanColumn as ColType, KanbanTask } from './KanbanBoard.types'
import { KanbanCard } from './KanbanCard'
import { useVirtualizedList } from '../../hooks/useVirtualizedList'

interface Props {
  column: ColType
  tasks: KanbanTask[]
  columnIndex: number
  onOpenTask: (task: KanbanTask) => void
  onDragOver?: (e: React.DragEvent, index: number) => void
  onDrop?: (e: React.DragEvent, index: number) => void
  onDragStart?: (e: React.DragEvent, taskId: string) => void
  onDragEnd?: (e: React.DragEvent) => void
}

export const KanbanColumn: React.FC<Props> = ({
  column,
  tasks,
  onOpenTask,
  onDragOver,
  onDrop,
  onDragStart,
  onDragEnd
}) => {
  const { start, end, containerRef, totalHeight, offsetTop } = useVirtualizedList(tasks.length, 120)

  const visibleTasks = useMemo(() => tasks.slice(start, end), [tasks, start, end])

  return (
    <div className="w-80 shrink-0 bg-neutral-50 rounded-lg p-3" role="region" aria-label={`${column.title} column`}>
      <div className="sticky top-0 bg-neutral-50 py-2 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">{column.title}</h3>
            <div className="text-xs text-neutral-500">{column.taskIds.length} tasks</div>
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-3 overflow-y-auto"
        style={{ maxHeight: '60vh' }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div style={{ transform: `translateY(${offsetTop}px)` }}>
            <div className="flex flex-col gap-3">
              {visibleTasks.map((task, idx) => {
                const absoluteIndex = start + idx
                return (
                  <div
                    key={task.id}
                    onDragOver={(e) => onDragOver?.(e, absoluteIndex)}
                    onDrop={(e) => onDrop?.(e, absoluteIndex)}
                  >
                    <KanbanCard
                      task={task}
                      onOpen={onOpenTask}
                      draggableProps={{
                        draggable: true,
                        onDragStart: (e: React.DragEvent) => onDragStart?.(e, task.id),
                        onDragEnd: (e: React.DragEvent) => onDragEnd?.(e)
                      }}
                    />
                  </div>
                )
              })}
              {tasks.length === 0 && (
                <div className="p-4 text-sm text-neutral-500">No tasks</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button
          className="w-full text-sm bg-white border border-neutral-200 px-3 py-2 rounded"
          aria-label={`Add task to ${column.title}`}
        >
          + Add Task
        </button>
      </div>
    </div>
  )
}
