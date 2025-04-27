import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import getAdmin from '../assets/Role/Admin/Admin/Admin';

jest.mock('axios');

describe('Admin Component', () => {
  const mockAdmins = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      address: '123 Main St',
      phone: '+36 70 123 4567'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      address: '456 Oak Ave',
      phone: '+36 70 765 4321'
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockAdmins });
  });

  test('renders admin list correctly', async () => {
    render(<BrowserRouter><getAdmin /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('ID: #1')).toBeInTheDocument();
      expect(screen.getByText('Név: John, Doe')).toBeInTheDocument();
      expect(screen.getByText('ID: #2')).toBeInTheDocument();
      expect(screen.getByText('Név: Jane, Smith')).toBeInTheDocument();
    });
  });

  test('opens modal with admin details when clicking on "További információk"', async () => {
    render(<BrowserRouter><getAdmin /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getAllByText('További információk').length).toBe(2);
    });

    fireEvent.click(screen.getAllByText('További információk')[0]);

    await waitFor(() => {
      expect(screen.getByText('Admin részletei')).toBeInTheDocument();
      expect(screen.getByText('ID: #1')).toBeInTheDocument();
      expect(screen.getByText('Név: John Doe')).toBeInTheDocument();
      expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('Állandó lakcím: 123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Telefon: +36 70 123 4567')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    console.log = jest.fn();
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<BrowserRouter><getAdmin /></BrowserRouter>);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Valami gikszer', expect.any(Error));
    });
  });
});
