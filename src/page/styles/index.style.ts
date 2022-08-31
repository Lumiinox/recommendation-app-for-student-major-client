import { css } from "@emotion/react";

export const ParentGridStyle = css`
    display: grid;
    grid-template-rows: 60px auto auto;
`;

export const ChildGridStyle = css`
	border: 5px solid;
`;

export const HeadWrapperStyle = css`
	padding: 15px 15px 15px 15px;
    display:flex;
    justify-content: space-between;
    background-color: rgb(68, 149, 255);
    color: white;
`;

export const HeaderButtonStyle = css`
    border: 1px solid white;
    text-align: center;
    width: 80px;
    padding: 2px;
    border-radius: 10px;
	&:hover{
		background-color: white;
		color: black;
		cursor: pointer;
	};
	&:active{
		background-color: rgb(68, 149, 255);
		color: white;
		-webkit-user-select: none;       
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	};
`;

export const ButtonStyle = css`
	border-radius: 20px;
	border: 1px solid #0098D7;
	background-color: #0098D7;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
	&:active{
		transform: scale(0.95);
	};
	&:focus{
		outline: none;
	}
	&.ghost{
		background-color: transparent;
		border-color: #FFFFFF;
	}
`;

export const FormStyle = css`
	background-color: #FFFFFF;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
`;

export const InputStyle = css`
	border-radius: 20px;
    background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
`;

export const HeaderOneStyle = css`
	font-weight: bold;
	margin: 10px 0 20px 0;
`;

export const ParagraphStyle = css`
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
	margin: 20px 0 30px;
`;

export const SpanStyle = css`
	font-size: 12px;
`;

export const ARefStyle = css`
	color: #333;
	font-size: 14px;
	text-decoration: none;
	margin: 15px 0;
`;

export const ContentWrapperStyle = css`
    display: flex;
    justify-content: center;
`;

export const ContentListStyle = css`
    display: flex;
    flex-wrap: wrap;
    width: 170vh;
    justify-content:space-evenly; 
`;