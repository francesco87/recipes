import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Modal Component', () => {
  const title = 'Test Title';
  const message = 'This is a test message';
  const handleClose = vi.fn();

  it('Modal is hidden', () => {
    render(<Modal title={title} showModal={false} handleClose={handleClose} />);
    const dialog = screen.queryByRole('dialog');
    expect(dialog).toBeNull();
  });

  it('Modal is showed', () => {
    render(<Modal title={title} message={message} showModal={true} handleClose={handleClose} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Controllo titolo e messaggio
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('Close Modal by button', () => {
    render(<Modal title={title} showModal={true} handleClose={handleClose} />);
    const button = screen.getByRole('button', { name: /close/i });
    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
