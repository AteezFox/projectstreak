import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import AdminDash from '../../../../assets/Role/Admin/AdminComponents/AdminDashboard/AdminDash';

// Mock the child components
vi.mock('../../../../assets/Role/Admin/AdminComponents/AdminNavbar/AdminNav', () => ({
    default: () => <div data-testid="admin-nav">Admin Nav</div>
}));

// Mock Material-UI components
vi.mock('@mui/material', () => ({
    Accordion: ({ children, className }) => (
        <div data-testid="accordion" className={className}>{children}</div>
    ),
    AccordionSummary: ({ children, expandIcon }) => (
        <div data-testid="accordion-summary">
            {children}
            {expandIcon}
        </div>
    ),
    AccordionDetails: ({ children }) => (
        <div data-testid="accordion-details">{children}</div>
    ),
    Typography: ({ children }) => <div data-testid="typography">{children}</div>,
    Container: ({ children, className }) => (
        <div data-testid="container" className={className}>{children}</div>
    )
}));

// Mock ExpandMoreIcon
vi.mock('@mui/icons-material/ExpandMore', () => ({
    default: () => <span data-testid="expand-icon">▼</span>
}));

describe('AdminDash', () => {
    it('renders basic structure', () => {
        render(<AdminDash />);
        
        // Check if AdminNav is rendered
        expect(screen.getByTestId('admin-nav')).toBeInTheDocument();
        
        // Check if container is rendered
        expect(screen.getByTestId('container')).toBeInTheDocument();
        
        // Check if main heading exists
        const heading = screen.getByRole('heading', { 
            name: 'Admin Dashboard',
            level: 1,
            exact: true
        });
        expect(heading).toBeInTheDocument();
    });

    it('renders all accordion sections', () => {
        render(<AdminDash />);
        
        // Check if all section titles are present
        const expectedSections = [
            'CEOs',
            'Customers',
            'Couriers',
            'Companies',
            'Products'
        ];

        expectedSections.forEach(section => {
            const sectionElement = screen.getByText(section, { exact: true });
            expect(sectionElement).toBeInTheDocument();
        });
    });

    it('renders correct number of accordions', () => {
        render(<AdminDash />);
        
        // Should have 5 accordion sections
        const accordions = screen.getAllByTestId('accordion');
        expect(accordions).toHaveLength(5);
        
        // Should have 5 expand icons
        const expandIcons = screen.getAllByTestId('expand-icon');
        expect(expandIcons).toHaveLength(5);
    });

    it('renders description text', () => {
        render(<AdminDash />);
        
        expect(screen.getByText('Here will be a series of requests at some point', {
            exact: true
        })).toBeInTheDocument();
    });

    it('renders accordion structure correctly', () => {
        render(<AdminDash />);
        
        // Check container exists
        const container = screen.getByTestId('container');
        expect(container).toBeInTheDocument();
        
        // Check accordions exist and have correct structure
        const accordions = screen.getAllByTestId('accordion');
        expect(accordions).toHaveLength(5);
        
        // Check each accordion has summary and details
        accordions.forEach((accordion, index) => {
            const summary = screen.getAllByTestId('accordion-summary')[index];
            const details = screen.getAllByTestId('accordion-details')[index];
            
            expect(summary).toBeInTheDocument();
            expect(details).toBeInTheDocument();
            
            // Check expand icon exists in summary
            const expandIcon = screen.getAllByTestId('expand-icon')[index];
            expect(expandIcon).toBeInTheDocument();
            expect(summary).toContainElement(expandIcon);
        });
    });
});