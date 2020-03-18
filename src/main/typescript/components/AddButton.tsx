import * as React from "react"
import styled from "styled-components"

interface Props {
	onClick: () => void
}

const Button = styled.button`
	position: absolute;
	right: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	appearance: none;
	width: 40px;
	height: 40px;
	font-size: 1.5rem;
	font-weight: 700;
	color: #fff;
	background: #000;
	border: none;
	border-radius: 100%;
	box-shadow: 0 2px 4px 1px rgba(0,0,0,0.3);

	@media (max-width: 768px) {
		top: calc(100vh - 3.5rem);
	}

	@media (min-width: 769px) {
		top: 1.5rem;
	}
`;

export default function AddButton(props: Props) {
	return (
		<Button onClick={props.onClick}>
		+
		</Button>
	)
}