import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import GetProduct from '../../../../assets/Role/Product/Product/Product';

jest.mock('axios');
jest.mock('../../../../assets/Role/Product/DeleteProduct/DeleteProduct.jsx', () => {
  return function MockDeleteProduct() {
    return <button data-testid="delete-product">Delete Product</button>;
  };
});
jest.mock('../../../../assets/Role/Product/UpdateProduct/UpdateProduct.jsx', () => {
  return function MockUpdateProduct() {
    return <button data-testid="update-product">Update Product</button>;
  };
});

describe('Product Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Test Product 1',
      description: 'This is a test product',
      category: 'Electronics',
      price: 99.99,
      companyId: 5
    },
    {
      id: 2,
      name: 'Test Product 2',
      description: 'Another test product',
      category: 'Clothing',
      price: 49.99,
      companyId: 3
    }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  test('renders product list correctly', async () => {
    render(<BrowserRouter><GetProduct /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText('ID: #1')).toBeInTheDocument();
      expect(screen.getByText('Név: Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('ID: #2')).toBeInTheDocument();
      expect(screen.getByText('Név: Test Product 2')).toBeInTheDocument();
    });
  });

  test('opens modal with product details when clicking on "További információk"', async () => {
    render(<BrowserRouter><GetProduct /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getAllByText('További információk').length).toBe(2);
    });

    fireEvent.click(screen.getAllByText('További információk')[0]);

    await waitFor(() => {
      expect(screen.getByText('Product részletei')).toBeInTheDocument();
      expect(screen.getByText('ID: #1')).toBeInTheDocument();
      expect(screen.getByText('Név: Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Leírás This is a test product')).toBeInTheDocument();
      expect(screen.getByText('Kategória: Electronics')).toBeInTheDocument();
      expect(screen.getByText('Ár: 99.99')).toBeInTheDocument();
      expect(screen.getByText('Cég ID: #5')).toBeInTheDocument();
      expect(screen.getByTestId('update-product')).toBeInTheDocument();
      expect(screen.getByTestId('delete-product')).toBeInTheDocument();
    });
  });

  test('handles API error gracefully', async () => {
    console.log = jest.fn();
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(<BrowserRouter><GetProduct /></BrowserRouter>);

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith('Valami gikszer', expect.any(Error));
    });
  });
});
