import React, { useState } from 'react'
import type { KanbanTask, KanbanColumn } from './KanbanBoard.types'

interface Props {
  task: KanbanTask
  onClose: () => void
  onUpdate: (updates: Partial<KanbanTask>) => void
  onDelete: () => void
  columns: KanbanColumn[]
}

export const TaskModal: React.FC<Props> = ({ task, onClose, onUpdate, onDelete, columns }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description ?? '')
  const [priority, setPriority] = useState(task.priority ?? 'medium')
  const [status, setStatus] = useState(task.status)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-lg p-6 shadow-modal">
        <h2 id="modal-title" className="text-lg font-semibold mb-3">Edit Task</h2>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-2 py-1 rounded mt-1" />
          </div>

          <div>
            <label className="text-xs font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-2 py-1 rounded mt-1" />
          </div>

          <div className="flex gap-3">
            <div>
              <label className="text-xs font-medium">Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="border px-2 py-1 rounded ml-2">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="urgent">urgent</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-2 py-1 rounded ml-2">
                {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </div>
          </div>

        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onDelete} className="text-red-600 px-3 py-1 rounded bg-red-50">Delete</button>
          <button onClick={onClose} className="px-3 py-1 rounded border">Cancel</button>
          <button onClick={() => onUpdate({ title, description, priority, status })} className="px-3 py-1 rounded bg-primary-500 text-white">Save</button>
        </div>
      </div>
    </div>
  )
}
