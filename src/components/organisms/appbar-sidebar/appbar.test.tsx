/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/test-utils';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Appbar from './appbar';
import { AppbarSidebarProvider } from './context';

// Mock the AppbarSearch component
vi.mock('../../atoms/input/app-bar-search', () => ({
  AppbarSearch: ({ placeholder }: { placeholder: string }) => (
    <input data-testid="appbar-search" placeholder={placeholder} />
  )
}));

// Mock IconButton component
vi.mock('../../atoms/button/icon-button', () => ({
  IconButton: ({ children, 'aria-label': ariaLabel, ...props }: any) => (
    <button data-testid="icon-button" aria-label={ariaLabel} {...props}>
      {children}
    </button>
  )
}));

// Mock Material-UI icons
vi.mock('@mui/icons-material/WifiCalling3Outlined', () => ({
  default: () => <span data-testid="wifi-calling-icon">WifiCalling3</span>
}));

vi.mock('@mui/icons-material/AccountBalanceWalletOutlined', () => ({
  default: () => <span data-testid="wallet-icon">AccountBalanceWallet</span>
}));

vi.mock('@mui/icons-material/InfoOutlined', () => ({
  default: () => <span data-testid="info-icon">Info</span>
}));

vi.mock('@mui/icons-material/AccessAlarmOutlined', () => ({
  default: () => <span data-testid="alarm-icon">AccessAlarm</span>
}));

vi.mock('@mui/icons-material/NotificationsNoneOutlined', () => ({
  default: () => <span data-testid="notifications-icon">NotificationsNone</span>
}));

vi.mock('@mui/icons-material/HelpOutlineOutlined', () => ({
  default: () => <span data-testid="help-icon">HelpOutline</span>
}));

vi.mock('@mui/icons-material/Call', () => ({
  default: () => <span data-testid="call-icon">Call</span>
}));

function renderWithProviders(
  ui: React.ReactElement,
  { color = "standard" as "standard" | "transitional", expanded = false } = {}
) {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <AppbarSidebarProvider color={color} expanded={expanded}>
        {ui}
      </AppbarSidebarProvider>
    </ThemeProvider>
  );
}

describe('Appbar', () => {
  describe('rendering and structure', () => {
    it('renders without crashing', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('renders logo with correct attributes', () => {
      renderWithProviders(<Appbar />);
      const logo = screen.getByRole('img', { name: /logo/i });
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'logo.png');
      expect(logo).toHaveAttribute('alt', 'Logo');
      expect(logo).toHaveAttribute('width', '154');
      expect(logo).toHaveAttribute('height', '32');
    });

    it('renders search component with correct placeholder', () => {
      renderWithProviders(<Appbar />);
      const searchInput = screen.getByTestId('appbar-search');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('placeholder', 'Search database');
    });

    it('renders all expected icon buttons', () => {
      renderWithProviders(<Appbar />);
      const iconButtons = screen.getAllByTestId('icon-button');
      
      // 2 (wifi + wallet) + 1 (info with badge) + 3 (alarm + notifications + help) = 6 total
      expect(iconButtons).toHaveLength(6);
    });

    it('renders wifi calling icon', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByTestId('wifi-calling-icon')).toBeInTheDocument();
    });

    it('renders wallet icon', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByTestId('wallet-icon')).toBeInTheDocument();
    });

    it('renders alarm icon', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByTestId('alarm-icon')).toBeInTheDocument();
    });

    it('renders notifications icon', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByTestId('notifications-icon')).toBeInTheDocument();
    });

    it('renders help icon', () => {
      renderWithProviders(<Appbar />);
      expect(screen.getByTestId('help-icon')).toBeInTheDocument();
    });
  });

  describe('badge functionality', () => {
    it('renders info icon with notification badge', () => {
      renderWithProviders(<Appbar />);
      
      const infoIcon = screen.getByTestId('info-icon');
      expect(infoIcon).toBeInTheDocument();
      
      // Check for badge content
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('renders info button with correct aria-label', () => {
      renderWithProviders(<Appbar />);
      
      const infoButton = screen.getByLabelText('1 notifications');
      expect(infoButton).toBeInTheDocument();
    });

    it('renders avatar with call status badge', () => {
      renderWithProviders(<Appbar />);
      
      const avatar = screen.getByRole('img', { name: /OP/i });
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'avatar.png');
      expect(avatar).toHaveAttribute('alt', 'OP');
      
      // Check for call icon in badge
      expect(screen.getByTestId('call-icon')).toBeInTheDocument();
    });
  });

  describe('context integration', () => {
    it('uses background color from context - standard theme', () => {
      const { container } = renderWithProviders(<Appbar />, { color: 'standard' });
      
      const appbar = container.querySelector('[class*="MuiAppBar"]');
      expect(appbar).toHaveStyle({ background: '#E3E2E9' });
    });

    it('uses background color from context - transitional theme', () => {
      const { container } = renderWithProviders(<Appbar />, { color: 'transitional' });
      
      const appbar = container.querySelector('[class*="MuiAppBar"]');
      expect(appbar).toHaveStyle({ background: '#F5F5F5' });
    });
  });

  describe('styling and layout', () => {
    it('applies correct appbar styles', () => {
      const { container } = renderWithProviders(<Appbar />);
      
      const appbar = container.querySelector('[class*="MuiAppBar"]');
      expect(appbar).toHaveStyle({
        boxShadow: 'none',
        height: '64px',
        padding: '8px 24px'
      });
    });

    it('has sticky positioning', () => {
      const { container } = renderWithProviders(<Appbar />);
      
      const appbar = container.querySelector('[class*="MuiAppBar"]');
      expect(appbar).toHaveClass('MuiAppBar-positionSticky');
    });

    it('applies flexbox layout for content alignment', () => {
      const { container } = renderWithProviders(<Appbar />);
      
      const appbar = container.querySelector('[class*="MuiAppBar"]');
      expect(appbar).toHaveStyle({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      });
    });
  });

  describe('icon button styling', () => {
    it('applies correct styles to icon buttons', () => {
      renderWithProviders(<Appbar />);
      
      const iconButtons = screen.getAllByTestId('icon-button');
      
      iconButtons.forEach(button => {
        expect(button).toHaveAttribute('color', 'default');
        // The mocked IconButton passes sx prop instead of size
        expect(button).toHaveAttribute('sx');
      });
    });

    it('applies correct color attribute to icon buttons', () => {
      renderWithProviders(<Appbar />);
      
      const iconButtons = screen.getAllByTestId('icon-button');
      
      // Check that all icon buttons have the color attribute
      iconButtons.forEach(button => {
        expect(button).toHaveAttribute('color', 'default');
      });
    });
  });

  describe('badge styling', () => {
    it('applies custom badge styles for notification', () => {
      const { container } = renderWithProviders(<Appbar />);
      
      // Check for notification badge custom styles in the DOM
      const badgeElements = container.querySelectorAll('[class*="MuiBadge"]');
      expect(badgeElements.length).toBeGreaterThan(0);
    });

    it('applies custom badge styles for call status', () => {
      const { container } = renderWithProviders(<Appbar />);
      
      // Check for call status badge (nested badges)
      const badgeElements = container.querySelectorAll('[class*="MuiBadge"]');
      expect(badgeElements.length).toBeGreaterThanOrEqual(2); // notification + call status badges
    });
  });

  describe('responsive behavior', () => {
    it('maintains layout structure across different contexts', () => {
      // Test with different context states
      const { rerender } = renderWithProviders(<Appbar />, { expanded: false });
      expect(screen.getByRole('banner')).toBeInTheDocument();
      
      rerender(
        <ThemeProvider theme={createTheme()}>
          <AppbarSidebarProvider expanded={true}>
            <Appbar />
          </AppbarSidebarProvider>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByTestId('appbar-search')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has proper semantic structure', () => {
      renderWithProviders(<Appbar />);
      
      // AppBar should be in a banner landmark
      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('has accessible notification button', () => {
      renderWithProviders(<Appbar />);
      
      const notificationButton = screen.getByLabelText('1 notifications');
      expect(notificationButton).toBeInTheDocument();
      expect(notificationButton).toHaveAttribute('aria-label', '1 notifications');
    });

    it('has accessible images', () => {
      renderWithProviders(<Appbar />);
      
      const logo = screen.getByRole('img', { name: /logo/i });
      const avatar = screen.getByRole('img', { name: /OP/i });
      
      expect(logo).toHaveAttribute('alt', 'Logo');
      expect(avatar).toHaveAttribute('alt', 'OP');
    });
  });
});
