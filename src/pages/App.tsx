import React, { useState, useCallback } from 'react'
import { KanbanBoard } from '../components/KanbanBoard/KanbanBoard'
import { sampleColumns, sampleTasks } from '../data/sample-data'
import type { KanbanColumn, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types'

export const App: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>(sampleColumns)
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(sampleTasks)

  const onTaskMove = useCallback((taskId: string, fromColumn: string, toColumn: string, newIndex: number) => {
    setColumns(prev => {
      const source = prev.find(c => c.id === fromColumn)
      const dest = prev.find(c => c.id === toColumn)
      if (!source || !dest) return prev
      const sourceClone = [...source.taskIds]
      const destClone = [...dest.taskIds]

      const i = sourceClone.indexOf(taskId)
      if (i !== -1) sourceClone.splice(i, 1)
      destClone.splice(newIndex, 0, taskId)

      return prev.map(c => {
        if (c.id === source.id) return { ...c, taskIds: sourceClone }
        if (c.id === dest.id) return { ...c, taskIds: destClone }
        return c
      })
    })

    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], status: toColumn } }))
  }, [])

  const onTaskCreate = useCallback((columnId: string, task: KanbanTask) => {
    setTasks(prev => ({ ...prev, [task.id]: task }))
    setColumns(prev => prev.map(c => c.id === columnId ? { ...c, taskIds: [task.id, ...c.taskIds] } : c))
  }, [])

  const onTaskUpdate = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks(prev => ({ ...prev, [taskId]: { ...prev[taskId], ...updates } }))
  }, [])

  const onTaskDelete = useCallback((taskId: string) => {
    setTasks(prev => {
      const clone = { ...prev }
      delete clone[taskId]
      return clone
    })
    setColumns(prev => prev.map(c => ({ ...c, taskIds: c.taskIds.filter(id => id !== taskId) })))
  }, [])

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Kanban Board — Starter</h1>
      <KanbanBoard
        columns={columns}
        tasks={tasks}
        onTaskCreate={onTaskCreate}
        onTaskDelete={onTaskDelete}
        onTaskMove={onTaskMove}
        onTaskUpdate={onTaskUpdate}
      />
    </div>
  )
}
