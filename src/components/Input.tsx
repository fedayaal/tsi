import type { FC, InputHTMLAttributes } from "react"

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Input: FC<IInputProps> = ({ label = "", ...rest }) => {
	return (
		<div className="flex flex-col gap-1">
			<div className="font-semibold">{label}</div>

			<input
				className="p-2 rounded-md border bg-transparent w-full border-gray-300"
				{...rest}
			/>
		</div>
	)
}
