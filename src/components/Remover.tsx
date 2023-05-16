import { Droppable } from "react-beautiful-dnd";
import { ImgBox, RemoverContainer } from '../style/DndStyle'

const Remover = () => {
    return (
			<RemoverContainer>
				<Droppable droppableId={'remove'} >
				{(provided, snapshot) => (
					<ImgBox
					isDraggingOver={snapshot.isDraggingOver}
					ref={provided.innerRef}
					{...provided.droppableProps}
					>
							<img src="/img/remove.png" alt="휴지통" />
							{provided.placeholder}
					</ImgBox>
				)}
				</Droppable>
			</RemoverContainer>
    );
};

export default Remover;