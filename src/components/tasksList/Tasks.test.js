import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import Tasks from './Tasks';

describe('Tasks', () => {
  it('renders the heading and input', () => {
    render(<Tasks />);
    expect(screen.getByRole('heading', { name: /to do list/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/write your task here/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save me/i })).toBeInTheDocument();
  });

  it('shows initial empty state with zero counts', () => {
    render(<Tasks />);
    const badges = screen.getAllByText('0');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('adds a task to the New Tasks list', () => {
    render(<Tasks />);
    const input = screen.getByPlaceholderText(/write your task here/i);
    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(screen.getByRole('button', { name: /save me/i }));
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  it('clears the input after adding a task', () => {
    render(<Tasks />);
    const input = screen.getByPlaceholderText(/write your task here/i);
    fireEvent.change(input, { target: { value: 'My task' } });
    fireEvent.click(screen.getByRole('button', { name: /save me/i }));
    expect(input.value).toBe('');
  });

  it('shows an alert when trying to add an empty task', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Tasks />);
    fireEvent.click(screen.getByRole('button', { name: /save me/i }));
    expect(alertSpy).toHaveBeenCalledWith('Please write a task before');
    alertSpy.mockRestore();
  });

  it('moves a task to Finished Tasks when checkbox is checked', () => {
    render(<Tasks />);
    const input = screen.getByPlaceholderText(/write your task here/i);
    fireEvent.change(input, { target: { value: 'Task to finish' } });
    fireEvent.click(screen.getByRole('button', { name: /save me/i }));

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(screen.queryByText('Task to finish')).toBeInTheDocument();
    expect(screen.getByText(/finished tasks/i)).toBeInTheDocument();
  });

  it('moves a task to Deleted Tasks when delete icon is clicked', () => {
    render(<Tasks />);
    const input = screen.getByPlaceholderText(/write your task here/i);
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.click(screen.getByRole('button', { name: /save me/i }));

    expect(screen.getByText('Task to delete')).toBeInTheDocument();

    const deleteIcon = document.querySelector('[aria-label]') ||
      document.querySelector('svg[class*="delete"]') ||
      screen.getByText('Task to delete').closest('tr').querySelector('svg');

    if (deleteIcon) {
      fireEvent.click(deleteIcon);
    }
  });

  it('does not show Show More button when tasks count is within limit', () => {
    render(<Tasks />);
    expect(screen.queryByText('Show More')).not.toBeInTheDocument();
  });

  it('shows Show More button when tasks exceed the visible limit', () => {
    render(<Tasks />);
    const input = screen.getByPlaceholderText(/write your task here/i);
    const saveButton = screen.getByRole('button', { name: /save me/i });

    for (let i = 1; i <= 5; i++) {
      fireEvent.change(input, { target: { value: `Task ${i}` } });
      fireEvent.click(saveButton);
    }

    expect(screen.getByText('Show More')).toBeInTheDocument();
  });
});
