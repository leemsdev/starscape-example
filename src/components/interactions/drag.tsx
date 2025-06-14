import { useEffect, useRef } from "react"

type DragProps = {
	onDrag: (x: number, y: number) => void,
	width: number,
	color: string,
}

// NOTE: This sucks btw lol, total hack, fix it
export default function Drag({ onDrag, color, width }: DragProps) {
	const isDragging = useRef(false)

	const mouse = useRef<{ x: number, y: number }>({ x: 0, y: 0 })

	const onMouseMove = (e: MouseEvent) => {
		mouse.current.x = e.clientX
		mouse.current.y = e.clientY

		if (isDragging.current) {
			onDrag(mouse.current.x, mouse.current.y)
		}
	}

	useEffect(() => {
		// NOTE: Kind of a hack to get around the mouse moving too fast. Think about fixing this
		//document.addEventListener("mouseup", () => { isDragging.current = false })

		window.addEventListener("mousemove", onMouseMove)
	}, [])

	const handleClick = () => {
		isDragging.current = !isDragging.current
	}

	return (
		<div draggable onClick={handleClick} style={{ width, backgroundColor: color, cursor: 'pointer' }} />
	)
}
