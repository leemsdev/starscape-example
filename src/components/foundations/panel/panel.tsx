import { ReactNode, useState } from "react";

import "./panel.styles.css"

export default function Panel({ children, label, startExpanded }: { children: ReactNode, label?: string, startExpanded?: boolean }) {
	const [isCollapsed, setIsCollapsed] = useState(!startExpanded)

	return (
		<div className="panel">
			<div className="header" onClick={() => setIsCollapsed(!isCollapsed)}>
				{label && <h2>{label}</h2>}
			</div>
			{!isCollapsed && <div className="content">{children}</div>}
		</div>
	)
}
