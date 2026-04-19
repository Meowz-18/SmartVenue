import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Map from './Map';

describe('Map Component Interactions', () => {
  it('opens and closes zone detail overlays', () => {
    render(<Map />);
    // Map should render
    expect(screen.getByText(/Live Venue Map/i)).toBeDefined();

    // Find north sector zone and click
    const northZone = screen.getByRole('button', { name: /Zone NORTH SECTOR/i });
    fireEvent.click(northZone);

    // Overlay should appear
    expect(screen.getByRole('dialog')).toBeDefined();
    expect(screen.getByText(/CRITICAL MODE/i)).toBeDefined();

    // Close it
    const closeBtn = screen.getByRole('button', { name: /×/i });
    fireEvent.click(closeBtn);

    // Overlay should disappear
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
