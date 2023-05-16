import { Droppable } from "react-beautiful-dnd";
import { Title, DropArea, BoardContainer, Form } from "../style/DndStyle";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atom/atoms";
import { useSetRecoilState } from "recoil";

interface ITodoProps {
  toDos: ITodo[];
  boardId: string;
}

export interface IDropArea {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

const Board = ({ toDos, boardId }: ITodoProps) => {
  // useRef => Dom에 직접접근
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setTodo = useSetRecoilState(toDoState);

  const handleValid = ({ toDo }: IForm) => {
    const newItem = {
      id: Date.now(),
      text: toDo,
    };
    setTodo((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newItem],
      };
    });
    setValue("toDo", "");
  };

  const removeBoard = () => {
    setTodo((allBoards) => {
      const copyBoards = {...allBoards};
      delete copyBoards[boardId];

      return {
        ...copyBoards
      };
    })
  }

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <BoardContainer>
        <img src="/img/close.png" alt="보드 제거 버튼" onClick={removeBoard} style={{cursor: 'pointer'}} />
        <Title>{boardId}</Title>
        <input type="text" {...register("toDo", { required: "할일을 작성해주세요" })} placeholder="할일을 작성해주세요" />
        <button>click</button>
        <Droppable droppableId={boardId}>
          {/* snapshot은 Droppable 내장 arg (마우스 오른쪽 클릭 후 go to type definition) */}
          {(provided, snapshot) => (
            <DropArea
              draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {toDos.map((toDo, index) => {
                return (
                  // Draggable의 key와 draggableId의 값은 같아야한다
                  <DraggableCard boardId={boardId} key={toDo.id.toString()} toDoId={toDo.id} toDoText={toDo.text} index={index} />
                );
              })}
              {/* beautiful dnd param 내에 있는 기능 (이동시킬때 부모 크기변동 X) */}
              {provided.placeholder}
            </DropArea>
          )}
        </Droppable>
      </BoardContainer>
    </Form>
  );
};

export default Board;
