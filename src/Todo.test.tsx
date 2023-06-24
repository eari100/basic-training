import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Todo } from "./Todo";

describe("Todo 컴포넌트 테스트", () => {
    test("할 일 추가하기", () => {
        render(<Todo />);

        const addButton = screen.getByText("추가");
        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "새로운 할 일" } });
        fireEvent.click(addButton);

        const todoItem = screen.getByText("새로운 할 일");
        expect(todoItem).toBeInTheDocument();
    });

    test("할 일 수정하기", () => {
        render(<Todo />);

        const addButton = screen.getByText("추가");
        const addInput = screen.getByRole("textbox");

        fireEvent.change(addInput, { target: { value: "할 일 1" } });
        fireEvent.click(addButton);
        fireEvent.click(screen.getByText("수정"));

        const editButton = screen.getByText("완료");
        const editInput = screen.getAllByRole("textbox")[1];

        fireEvent.change(editInput, { target: { value: "수정된 할 일 1" } });
        fireEvent.click(editButton);

        const updatedItem = screen.getByText("수정된 할 일 1");
        expect(updatedItem).toBeInTheDocument();
    });

    test("할 일 삭제하기", () => {
        render(<Todo />);

        const addButton = screen.getByText("추가");
        const input = screen.getByRole("textbox");

        fireEvent.change(input, { target: { value: "할 일 1" } });
        fireEvent.click(addButton);

        fireEvent.change(input, { target: { value: "할 일 2" } });
        fireEvent.click(addButton);

        const deleteButton = screen.getAllByText("삭제")[0];
        fireEvent.click(deleteButton);

        const deletedItem = screen.queryByText("할 일 1");
        expect(deletedItem).toBeNull();

        const todoItem = screen.queryByText("할 일 2");
        expect(todoItem).toBeInTheDocument();
    });
});
