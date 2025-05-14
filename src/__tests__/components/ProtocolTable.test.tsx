import { expect, test, describe, mock, beforeEach } from 'bun:test';
import { render, screen, fireEvent } from '@testing-library/react';
import ProtocolTable from '../../components/ProtocolTable';
import { mockProtocols } from '../mocks/mockData';
import { useProtocolsStore } from '../../hooks/useProtocolsStore';

// Mock the useProtocolsStore hook
mock.module('../../hooks/useProtocolsStore', () => ({
  useProtocolsStore: () => ({
    protocols: mockProtocols,
    isLoading: false,
    error: null,
    sortConfig: { field: 'apy', order: 'desc' },
    handleSort: (field: string) => {}
  })
}));

// Mock CSS modules
mock.module('*.module.css', () => ({
  default: {
    protocolTable: 'protocolTable',
    protocolTableRow: 'protocolTableRow',
    sortableHeader: 'sortableHeader',
    sortIconAsc: 'sortIconAsc',
    sortIconDesc: 'sortIconDesc',
    safetyBadge: 'safetyBadge',
    easeOfUseBadge: 'easeOfUseBadge',
    chainList: 'chainList',
    chainBadge: 'chainBadge'
  }
}));

describe('ProtocolTable Component', () => {
  test.skip('renders protocol table with correct number of rows', () => {
    // Set limit to 2 to test limiting functionality
    render(<ProtocolTable limit={2} />);

    // Header row + 2 protocol rows
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);
  });

  test.skip('renders all protocols when no limit is provided', () => {
    render(<ProtocolTable />);

    // Header row + all protocols
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockProtocols.length + 1);
  });

  test.skip('displays protocol data correctly', () => {
    render(<ProtocolTable />);

    // Check if protocol names are displayed
    mockProtocols.forEach(protocol => {
      expect(screen.getByText(protocol.name)).toBeDefined();
    });

    // Check if APY values are displayed correctly
    mockProtocols.forEach(protocol => {
      expect(screen.getByText(protocol.apy.toFixed(1) + '%')).toBeDefined();
    });

    // Check if TVL values are displayed correctly (in billions or millions)
    mockProtocols.forEach(protocol => {
      const tvlInBillions = protocol.tvl >= 1e9
        ? `$${(protocol.tvl / 1e9).toFixed(1)}B`
        : `$${(protocol.tvl / 1e6).toFixed(0)}M`;
      expect(screen.getByText(tvlInBillions)).toBeDefined();
    });
  });

  test.skip('displays safety and ease of use scores correctly', () => {
    render(<ProtocolTable />);

    // Check if safety scores are displayed correctly
    mockProtocols.forEach(protocol => {
      const safetyScore = (protocol.safetyScore / 10).toFixed(1);
      expect(screen.getByText(new RegExp(safetyScore))).toBeDefined();
    });

    // Check if ease of use scores are displayed correctly
    mockProtocols.forEach(protocol => {
      const easeOfUseScore = (protocol.easeOfUseScore / 10).toFixed(1);
      expect(screen.getByText(new RegExp(easeOfUseScore))).toBeDefined();
    });
  });

  test.skip('displays chain information correctly', () => {
    render(<ProtocolTable />);

    // Check if the first chain of each protocol is displayed
    mockProtocols.forEach(protocol => {
      if (protocol.metadata?.chains?.length) {
        const firstChain = protocol.metadata.chains[0];
        expect(screen.getByText(new RegExp(firstChain))).toBeDefined();
      }
    });
  });
});
