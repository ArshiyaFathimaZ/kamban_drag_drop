import { useRef, useState } from 'react'
import type { DragEvent } from 'react'

type DragPayload = {
  taskId: string
  fromColumn: string
}

export const useDragAndDrop = () => {
  const payloadRef = useRef<DragPayload | null>(null)
  const [dragState, setDragState] = useState<{ dragging: boolean; overColumn?: string; overIndex?: number }>({ dragging: false })

  const handleDragStart = (e: DragEvent, payload: DragPayload) => {
    payloadRef.current = payload
    setDragState({ dragging: true, overColumn: payload.fromColumn, overIndex: 0 })
    try {
      e.dataTransfer!.setData('text/plain', JSON.stringify(payload))
      e.dataTransfer!.effectAllowed = 'move'
    } catch {
      // some browsers restrict
    }
  }

  const handleDragOver = (e: DragEvent, info: { columnId: string; index: number }) => {
    e.preventDefault()
    setDragState({ dragging: true, overColumn: info.columnId, overIndex: info.index })
  }

  const handleDrop = (e: DragEvent, info: { columnId: string; index: number }, onTaskMove?: (taskId: string, fromColumn: string, toColumn: string, newIndex: number) => void) => {
    e.preventDefault()
    const data = payloadRef.current
    if (!data) {
      try {
        const raw = e.dataTransfer?.getData('text/plain')
        if (raw) payloadRef.current = JSON.parse(raw)
      } catch {}
    }
    const payload = payloadRef.current
    if (payload && onTaskMove) {
      onTaskMove(payload.taskId, payload.fromColumn, info.columnId, info.index)
    }
    payloadRef.current = null
    setDragState({ dragging: false })
  }

  const handleDragEnd = () => {
    payloadRef.current = null
    setDragState({ dragging: false })
  }

  return { dragState, handleDragStart, handleDragOver, handleDrop, handleDragEnd }
}
