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

test('Add multiple tasks', () =>{
  render(<App />)
  const input = screen.getByLabelText('Task:')
  const addBtn = screen.getByText('Add')

  fireEvent.change(input, {target: {value: 'New Task 1'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 2'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 3'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 4'}})
  fireEvent.click(addBtn)

  const getAllTasks = screen.getAllByText(/^New Task \d$/)

  expect(getAllTasks).toHaveLength(4)
})

test('Add multiple tasks and delete one', () =>{
  render(<App />)
  const input = screen.getByLabelText('Task:')
  const addBtn = screen.getByText('Add')

  fireEvent.change(input, {target: {value: 'New Task 1'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 2'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 3'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 4'}})
  fireEvent.click(addBtn)

  const delBtn = screen.getAllByText('Delete')
  fireEvent.click(delBtn[0])


  const getAllTasks = screen.getAllByText(/^New Task \d$/)

  expect(getAllTasks).toHaveLength(3)
  expect(getAllTasks[0]).toHaveTextContent('New Task 2')
  expect(getAllTasks[1]).toHaveTextContent('New Task 3')
  expect(getAllTasks[2]).toHaveTextContent('New Task 4')
})


test('Add multiple tasks and complete one', () =>{
  render(<App />)
  const input = screen.getByLabelText('Task:')
  const addBtn = screen.getByText('Add')

  fireEvent.change(input, {target: {value: 'New Task 1'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 2'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 3'}})
  fireEvent.click(addBtn)
  fireEvent.change(input, {target: {value: 'New Task 4'}})
  fireEvent.click(addBtn)

  const completeBtn = screen.getAllByText('Mark Complete')
  fireEvent.click(completeBtn[0])


  const getAllTasks = screen.getAllByText(/^New Task \d$/)

  expect(getAllTasks[0]).toHaveClass('complete')
})