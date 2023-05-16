import styled from "styled-components";
import { IDropArea } from "../components/Board";

export const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Boards = styled.div`
  display: grid;
  width: 100%;
  gap:10px;
  grid-template-columns: repeat(3, 1fr);
`;

export const BoardWrap = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

export const Card = styled.div<{isDragging : boolean}>`
  display:flex;
  justify-content :space-between;
  align-items:center;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? '#f7f1e3' : props.theme.cardColor};
  transition : background-color .25s ease-in-out;

  .btnBox {display:flex;}
  .btnBox button{flex:1;}
`;

export const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;


export const DropArea = styled.div<IDropArea>`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${({ isDraggingOver, draggingFromThisWith }) => (isDraggingOver ? "#48dbfb" : draggingFromThisWith ? "#00d2d3" : "#dff9fb")};
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 0.25s ease-in-out;

  img {
    width:40px
  }
`;

export const BoardContainer = styled.div`
  position:relative;
  padding: 20px 10px;
  padding-top: 30px;
  background-color: #dff9fb;
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 0.25s ease-in-out;

  & > img {
    position:absolute;
    top:10px;
    right:10px;
    width:20px;
  }
`;

export const Form = styled.form`
  width: 100%;
  input {
    width: 70%;
  }
  button {
    width:30%;
  }
`;

export const ImgBox = styled.div<{isDraggingOver : boolean}>`
  position:relative;
  width:50px;
  height:50px;
  padding:15px;
  border-radius: 50%;
  background-color: ${({ isDraggingOver }) => ( isDraggingOver ? "#dff9fb" : '#fff')};
  transition :background-color .25s ease-in-out;

  img {
    width:100%;
  }
`

export const RemoverContainer = styled.div`
	position:fixed;
	bottom:50px;
	right:50px;
`

export const AddBoardBox = styled.div`
  padding:20px 0;
  text-align:center;
`
