import { memo, useEffect } from 'react'
import type { CSSProperties, FC } from 'react'

import { useDrag } from 'react-dnd'
import type { DragSourceMonitor } from 'react-dnd'

import { getEmptyImage } from 'react-dnd-html5-backend'

import { Markdown } from './Markdown'
import { ItemTypes } from '../ItemTypes'

function getStyles(
  left: number,
  top: number,
  isDragging: boolean,
): CSSProperties {
  const transform = `translate3d(${left}px, ${top}px, 0)`

  return {
    position: 'absolute',
    transform,
    WebkitTransform: transform,

    // IE fallback: hide the real node using CSS when dragging
    // because IE will ignore our custom "empty image" drag preview.
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : '',
  }
}

export type MarkdownDraggableProps = {
  id: string
  title: string
  left: number
  top: number
}

export const MarkdownDraggable: FC<MarkdownDraggableProps> = memo(function DraggableBox(
  props,
) {
  const { id, title, left, top } = props
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: ItemTypes.Markdown,
      item: { id, left, top, title },
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, title],
  )

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="MarkdownDraggable"
    >
      <Markdown title={title} />
    </div>
  )
})

