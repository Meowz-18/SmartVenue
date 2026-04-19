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
    // Check if the dashboard or some layout element is present.
    // The MainLayout contains a nav element or SmartVenue header.
    const headerElement = screen.getByText(/SmartVenue/i);
    expect(headerElement).toBeDefined();
  });
});
