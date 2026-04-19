import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Community from './Community';

describe('Community Integration', () => {
  it('renders community hub and filters correctly', () => {
    render(<Community />);
    expect(screen.getByText(/Community Hub/i)).toBeDefined();
    
    // Check if initial posts exist
    const tipPost = screen.getByText(/queue in Section 112/i);
    expect(tipPost).toBeDefined();

    // Click filter
    const filterHelp = screen.getByRole('tab', { name: /help/i });
    fireEvent.click(filterHelp);
    
    // Check if tip post is hidden
    expect(screen.queryByText(/queue in Section 112/i)).toBeNull();
    // Check if help post remains
    expect(screen.getByText(/black wallet near Gate B/i)).toBeDefined();
  });
});
