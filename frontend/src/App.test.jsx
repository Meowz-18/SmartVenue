import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

// Mock matchMedia for recharts or framer-motion if needed
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('App Integration', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Since App uses React.lazy, it will show the Suspense fallback initially
    const loadingElement = screen.getByText(/Loading Module/i);
    expect(loadingElement).toBeDefined();
  });
});
