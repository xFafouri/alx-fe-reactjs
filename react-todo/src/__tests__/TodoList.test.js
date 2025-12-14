import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    fireEvent.change(screen.getByPlaceholderText("Add todo"), {
      target: { value: "New Todo" }
    });
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);
    fireEvent.click(screen.getByText("Learn React"));
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    fireEvent.click(screen.getAllByText("Delete")[1]);
    expect(screen.queryByText("Write Tests")).not.toBeInTheDocument();
  });
});
