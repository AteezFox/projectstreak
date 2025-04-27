import React from 'react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('*.module.css', () => {
    return {
        default: new Proxy(
            {},
            {
                get: (target, key) => key,
            }
        ),
    };
});

vi.mock('@mui/icons-material/ExpandMore', () => ({
    default: () => React.createElement('div', { 'data-testid': 'ExpandMoreIcon' })
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
}); 