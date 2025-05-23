import type { ButtonHTMLAttributes, FC, ReactNode } from "react"

type ButtonSize = "small" | "medium" | "large"
type ButtonColor = "primary" | "secondary"

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: ButtonSize
	color?: ButtonColor
	children?: ReactNode
}

export const Button: FC<IButtonProps> = ({
	size = "medium",
	color = "primary",
	children = "",
	...rest
}) => {
	// класс по умолчанию
	const defaultClass =
		"flex items-center justify-center cursor-pointer w-auto py-2"

	const classes = {
		colors: {
			primary: {
				button: "bg-slate-500",
				text: "text-white",
			},
			secondary: {
				button: "bg-slate-400",
				text: "text-gray",
			},
		},
		sizes: {
			small: "rounded-sm font-sm h-8 px-4",
			medium: "rounded-md font-base h-10 px-5",
			large: "rounded-xl font-base h-12 px-6",
		},
	}

	return (
		<button
			className={
				defaultClass +
				" " +
				classes.sizes[size] +
				" " +
				classes.colors[color].button
			}
			{...rest}
		>
			<div className={classes.colors[color].text}>{children}</div>
		</button>
	)
}
