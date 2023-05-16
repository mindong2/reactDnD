// react 18 -> npm i react-beautiful-dnd --legacy-peer-deps
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { toDoState } from "./atom/atoms";
import { Wrapper, Boards, AddBoardBox } from "./style/DndStyle";
import Board from "./components/Board";
import Remover from './components/Remover'
import { useState } from "react";

const App = () => {
  const [addBoard, setAddBoard] = useState<string>('')
  const [toDos, setToDos] = useRecoilState(toDoState);
  /* react-beautiful-dnd 에서 onDragEnd에서는  
    result와 provide라는 인수를 받는다 (dnd 종료시 호출되는 함수)
    그중 destination -> 드롭 된 위치
    source -> 드래그 시작 위치
    타입은 해당 함수의 d.ts 참고
  */
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (!destination) return;

    // 휴지통 추가
    if(destination?.droppableId === 'remove') {
      setToDos((allBoards) => {
        const removeCopy = [...allBoards[source.droppableId]];
        removeCopy.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId] : removeCopy
        }
      })
    }

    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const copyBoard = [...allBoards[source.droppableId]];
        const copyBoardElement = copyBoard.splice(source.index, 1)[0];
        copyBoard.splice(destination?.index, 0, copyBoardElement);
        return {
          ...allBoards,
          // object의 키가 이미 있기때문에 update를 할때는 아래 작성하면 덮어진다
          [source.droppableId]: copyBoard,
        };
      });
    } else if((destination?.droppableId !== source.droppableId) &&  destination.droppableId !== 'remove'){
      setToDos((allBoards) => {
        const copyStartBoard = [...allBoards[source.droppableId]];
        const copyEndBoard = [...allBoards[destination.droppableId]];
        const copyBoardElement = copyStartBoard.splice(source.index, 1)[0];
        copyEndBoard.splice(destination?.index, 0, copyBoardElement);

        return {
          ...allBoards,
          [source.droppableId]: copyStartBoard,
          [destination.droppableId]: copyEndBoard,
        };
      });
    }
  };

  const addBoardFn = (e : React.FormEvent<HTMLInputElement>) => {
    setAddBoard(e.currentTarget.value);
  }

  const addBtnClick = () => {
    if(addBoard === '') {
      window.alert('보드 이름을 입력해주세요')
      return;
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [addBoard] : []
      }
    });
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddBoardBox>
        <input onInput={addBoardFn} type="text" placeholder="보드를 추가해보세요" />
        <button onClick={addBtnClick} type="button">추가</button>
      </AddBoardBox>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          
        </Boards>
        <Remover />
      </Wrapper>
    </DragDropContext>
  );
};

export default App;
