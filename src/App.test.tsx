/* eslint-disable testing-library/prefer-screen-queries */
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import App from './App';


test('task list starts empty', () =>{
  render(<App />)
  const addButton = screen.getByText('Add')
  expect(addButton).toBeInTheDocument()
})

test('adding a task', () =>{
  render(<App />)
  const input = screen.getByLabelText('Task:')
  const addBtn = screen.getByText('Add')

  fireEvent.change(input, {target: {value: 'New Task'}})
  fireEvent.click(addBtn)

  const newTask = screen.getByText('New Task')

  expect(newTask).toBeInTheDocument()
})


test('delete a task', () => {
  render(<App />);
  const input = screen.getByLabelText('Task:');
  const addBtn = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addBtn);

  const delBtn = screen.getByText('Delete');

  fireEvent.click(delBtn);
  const deletedTask = screen.queryByText('New Task');

  expect(deletedTask).toBeNull();
});

test('Complete a Task', () =>{
  render(<App />)
  const input = screen.getByLabelText('Task:')
  const addBtn = screen.getByText('Add')
  fireEvent.change(input, {target: {value: 'New Task'}})
  fireEvent.click(addBtn)
  const complete = screen.getByText('Mark Complete')
  fireEvent.click(complete)
  const newTask = screen.getByText('New Task')
  expect(newTask).toHaveClass('complete')
})

