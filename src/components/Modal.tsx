import type { FC, ReactNode } from "react"

interface IModalProps {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}
export const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null

	return (
		<div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center z-50">
			<div className="bg-white min-h-10 rounded-xl p-6 max-w-md w-full relative">
				<button
					onClick={onClose}
					className="absolute text-2xl cursor-pointer top-2 right-4 text-gray-500 hover:text-black"
				>
					&times;
				</button>
				{children}
			</div>
		</div>
	)
}
