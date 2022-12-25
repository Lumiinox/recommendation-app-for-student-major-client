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

export const LogOutButtonStyle = css`
    border: 1px solid white;
    text-align: center;
    width: 80px;
    padding: 2px;
    border-radius: 10px;
    &:hover{
        background-color: white;
        color: black;
        cursor: pointer;
    }
    &:active{
        background-color: rgb(68, 149, 255);
        color: white;
        -webkit-user-select: none;       
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none; 
    }
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

export const RegularButtonStyle = css`
	padding: 10px 0px;
	margin: 10px 0px;
	min-width: 20vh;
`;

export const ProfileWrapperStyle = css`
    display: flex;
    justify-content: center;
`;

export const ProfileCardStyle = css`
    text-align: center;
    margin: 30px 0;
    padding: 20px 0;
    width: 160vh;
    height: 20vh;
    border-radius: 30px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover {
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;

export const ContentCardStyle = css`
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #646464;
    font-size: 20px;
    margin: 20px 0;
    padding: 20px;
    min-width: 50vh;
    min-height: 20vh;
    border-radius: 30px;
    box-shadow: 0px 5px 10px rgb(150, 150, 150);
    &:hover{
        transition-duration: 0.2s;
        box-shadow: 0px 10px 13px rgb(150, 150, 150);
    }
`;

export const HeadTitleStyle = css`
    padding-left: 35px;
`;

export const FormTitleStle = css`
    font-weight: bold;
    font-size: 20px;
`;

export const FormSectionStyle = css`
    padding: 20px 0;
`;

export const FormLabelStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
`; 

export const FormTextAreaStyle = css`
    width: 100%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    padding: 10px 25px;
    font-size: 20px;
    margin-top: 10px;
`;

export const FormInputTextStyle = css`
    width: 100%;
    background-color: #eee;
    border-radius: 30px;
    border: 0;
    resize: none;
    font-size: 20px;
    margin-top: 10px;
`;

export const homeCardIconStyle = css`
    font-size: 50px;
    margin-bottom: 20px;
    color: #7a7a7a;
`;