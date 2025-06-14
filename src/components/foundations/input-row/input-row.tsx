import { ReactNode } from "react";

import "./input-row.styles.css"

export default function InputRow({ children }: { children: ReactNode }) {
	return (
		<div>{children}</div>
	)
}
