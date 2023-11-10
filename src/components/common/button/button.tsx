import React from 'react';

interface ButtonProps {
	text: string;
	width: string;
	height: string;
	backgroundColor: string;
	onClick?: () => void; // Make onClick prop optional
}

const Button: React.FC<ButtonProps> = ({
	text,
	width,
	height,
	backgroundColor,
	onClick,
}) => {
	const buttonStyle = {
		width: `${width}px`,
		height: `${height}px`,
	};

	return (
		<div
			className="top-251 left-199 rounded-5 flex items-center justify-center text-white transition cursor-pointer"
			style={{
				...buttonStyle,
				position: 'absolute',
				backgroundColor, // Set the background color dynamically
			}}
			onClick={onClick}
		>
			{text}
		</div>
	);
};

export default Button;
