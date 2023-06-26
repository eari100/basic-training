import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Todo } from './Todo';
import { getTodos, saveTodos, patchTodos, deleteTodos } from './api/todosApi';

jest.mock('./api/todosApi');

describe('Todo 컴포넌트', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('할 일 추가하기', async () => {
        const todosData = [
            { id: 1, item: '할 일 1' },
            { id: 2, item: '할 일 2' },
        ];

        (getTodos as jest.Mock).mockResolvedValue(todosData);
        (saveTodos as jest.Mock).mockResolvedValue(undefined);

        render(<Todo />);

        const newTodoInput = screen.getByRole("textbox");
        const addButton = screen.getByText("추가");

        fireEvent.change(newTodoInput, { target: { value: '새로운 할 일' } });
        fireEvent.click(addButton);

        const updatedTodosData = [
            ...todosData,
            { id: 3, item: '새로운 할 일' },
        ];

        (getTodos as jest.Mock).mockResolvedValue(updatedTodosData);

        expect(saveTodos).toHaveBeenCalledWith('새로운 할 일');
        expect(getTodos).toHaveBeenCalledTimes(1);

        await screen.findByText('할 일 1');
        await screen.findByText('할 일 2');
        expect(screen.getByText('새로운 할 일')).toBeInTheDocument();
    });


    test('할 일 수정하기', async () => {
        const todosData = [{ id: 1, item: '할 일' }];
        (getTodos as jest.Mock).mockResolvedValue(todosData);
        (patchTodos as jest.Mock).mockResolvedValue(undefined);

        render(<Todo />);

        await screen.findByText('수정');
        const editButton = screen.getByText("수정");
        fireEvent.click(editButton);

        const editInput = screen.getAllByRole("textbox")[1];

        await screen.findByText('완료');
        const doneButton = screen.getByText("완료");

        fireEvent.change(editInput, { target: { value: '수정된 할 일' } });
        fireEvent.click(doneButton);

        const updatedTodosData = [
            { id: 1, item: '수정된 할 일' },
        ];

        (getTodos as jest.Mock).mockResolvedValue(updatedTodosData);

        expect(patchTodos).toHaveBeenCalledWith(1, '수정된 할 일');
        expect(getTodos).toHaveBeenCalledTimes(1);

        await screen.findByText('수정된 할 일');
        expect(screen.getByText('수정된 할 일')).toBeInTheDocument();
    });

    test('할 일 삭제하기', async () => {
        const todosData = [{ id: 1, item: '할 일' }];
        (getTodos as jest.Mock).mockResolvedValue(todosData);
        (deleteTodos as jest.Mock).mockResolvedValue(undefined);
        window.confirm = jest.fn(() => true);

        render(<Todo />);

        await screen.findByText('삭제');
        const deleteButton = screen.getByText('삭제');
        fireEvent.click(deleteButton);
        expect(window.confirm).toHaveBeenCalledWith('정말로 삭제하시겠습니까?');

        const updatedTodosData = [{}];

        (getTodos as jest.Mock).mockResolvedValue(updatedTodosData);

        expect(deleteTodos).toHaveBeenCalledWith(1);
        expect(getTodos).toHaveBeenCalledTimes(1);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            await screen.findByText('할 일', { exact: false });
        });
    });
});
