import React from 'react';

interface ButtonProps {
	text: string;
	width: string;
	height: string;
}

const Button: React.FC<ButtonProps> = ({ text, width, height }) => {
	const buttonStyle = {
		width: `${width}px`,
		height: `${height}px`,
	};

	return (
		<div
			className="top-251 left-199 rounded-5 bg-ff176b flex items-center justify-center text-white transition cursor-pointer"
			style={{
				...buttonStyle,
				position: 'absolute',
			}}
		>
			{text}
		</div>
	);
};

export default Button;
