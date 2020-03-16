import * as React from "react"
import styled from "styled-components"

interface Props {
	onClick: () => void
}

const Button = styled.button`
	position: absolute;
	top: calc(100vh - 80px);
	right: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	appearance: none;
	width: 40px;
	height: 40px;
	font-size: 24px;
	font-weight: 700;
	color: #fff;
	background: #000;
	border: none;
	border-radius: 100%;
	box-shadow: 0 2px 4px 1px rgba(0,0,0,0.3);
`;

export default function AddButton(props: Props) {
	return (
		<Button onClick={props.onClick}>
		+
		</Button>
	)
}