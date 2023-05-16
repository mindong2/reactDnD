import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom/atoms";
import { Card } from "../style/DndStyle";

interface ICard {
  boardId : string;
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ boardId, toDoId, toDoText, index }: ICard) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateValue, setUpdateValue] = useState(toDoText)
  const setToDos = useSetRecoilState(toDoState);

  const removeCard = () => {
    setToDos((allBoards) => {
      const removeCopy = [...allBoards[boardId]];
      removeCopy.splice(index, 1);
      return {
        ...allBoards,
        [boardId] : removeCopy
      }
    })
  }

  const updateVal = (e : React.FormEvent<HTMLInputElement>) => {
    setUpdateValue(e.currentTarget.value);
  }

  const updateCard = () => {
    
    if(isUpdate === true) {
      if(updateValue === ''){
        window.alert('변경할 카드내용을 작성해주세요')
        return;
      }else{
        setToDos((allBoards) => {
          const removeCopy = [...allBoards[boardId]];
          removeCopy.splice(index, 1);
          removeCopy.splice(index, 0 , {
            id : Date.now(),
            text : updateValue
          })
          return {
            ...allBoards,
            [boardId] : removeCopy
          }
        })
      }
    }
    setIsUpdate(prev => !prev)

  }

  return (
    <Draggable key={toDoId.toString()} draggableId={toDoId.toString()} index={index}>
      {(provided, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
          {/* dragHandleProps를 지정해준 요소를 드래그해야 이벤트가 일어남 */}
          <div>
            {
              isUpdate === true ? 
              <input type="text" onChange={updateVal} value={updateValue} />
              : toDoText
            }
          </div>
          <div className="btnBox">
            <button type="button" onClick={updateCard}>수정</button>
            <button type="button" onClick={removeCard}>삭제</button>
          </div>
        </Card>
      )}
    </Draggable>
  );
};

/* 
  컴포넌트의 prop이 바뀌지 않았으면 부모의 state가 변경되어도 재렌더링 하지 말아달라는 의미
  변경된 prop에 대해서만 재렌더링
 */
export default React.memo(DraggableCard);
