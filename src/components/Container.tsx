import type { ReactNode } from "react"

export const Container = ({ children }: { children: ReactNode }) => {
	return <div className="bg-slate-300 px-8">{children}</div>
}
