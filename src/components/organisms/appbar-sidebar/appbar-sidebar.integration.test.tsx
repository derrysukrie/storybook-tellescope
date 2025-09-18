/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '../../../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppbarSidebar from './appbar-sidebar';

// Mock the AppbarSearch component to be interactive
vi.mock('../../atoms/input/app-bar-search', () => ({
  AppbarSearch: ({ placeholder }: { placeholder: string }) => (
    <input 
      data-testid="appbar-search" 
      placeholder={placeholder}
      onChange={() => {}}
    />
  )
}));

// Mock IconButton component to be interactive
vi.mock('../../atoms/button/icon-button', () => ({
  IconButton: ({ children, 'aria-label': ariaLabel, onClick, ...props }: any) => (
    <button 
      data-testid="icon-button" 
      aria-label={ariaLabel} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}));

// Mock Material-UI icons with data-testid for easier selection
vi.mock('@mui/icons-material/KeyboardArrowLeft', () => ({
  default: () => <span data-testid="arrow-left-icon">ArrowLeft</span>
}));

vi.mock('@mui/icons-material/WifiCalling3Outlined', () => ({
  default: () => <span data-testid="wifi-calling-icon">WifiCalling3</span>
}));

vi.mock('@mui/icons-material/AccountBalanceWalletOutlined', () => ({
  default: () => <span data-testid="wallet-icon">AccountBalanceWallet</span>
}));

vi.mock('@mui/icons-material/InfoOutlined', () => ({
  default: () => <span data-testid="info-icon">Info</span>
}));

vi.mock('@mui/icons-material/NotificationsNoneOutlined', () => ({
  default: () => <span data-testid="notifications-icon">NotificationsNone</span>
}));

vi.mock('@mui/icons-material/Dashboard', () => ({
  default: () => <span data-testid="dashboard-icon">Dashboard</span>
}));

vi.mock('@mui/icons-material/BarChart', () => ({
  default: () => <span data-testid="analytics-icon">BarChart</span>
}));

function renderWithTheme(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('AppbarSidebar Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('complete component rendering workflow', () => {
    it('renders full component suite with all sub-components', () => {
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="page-content">
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
          </div>
        </AppbarSidebar>
      );

      // Verify all major components are present
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Appbar
      expect(screen.getByRole('list')).toBeInTheDocument(); // Sidebar navigation
      expect(screen.getByTestId('page-content')).toBeInTheDocument(); // Content
      
      // Verify appbar elements
      expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
      expect(screen.getByTestId('appbar-search')).toBeInTheDocument();
      expect(screen.getByTestId('wifi-calling-icon')).toBeInTheDocument();
      expect(screen.getByTestId('wallet-icon')).toBeInTheDocument();
      
      // Verify sidebar elements
      expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('maintains proper layout hierarchy and structure', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      // Check the main container structure
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveStyle({
        backgroundColor: '#E3E2E9',
        borderRadius: '28px',
        overflow: 'hidden'
      });

      // Check that appbar is at the top level
      const appbar = screen.getByRole('banner');
      expect(mainContainer).toContainElement(appbar);

      // Check that sidebar and content are in flex row
      const sidebar = screen.getByRole('list');
      const content = screen.getByTestId('content');
      expect(mainContainer).toContainElement(sidebar);
      expect(mainContainer).toContainElement(content);
    });
  });

  describe('theme switching workflow', () => {
    it('updates all component backgrounds when theme changes', () => {
      const { container, rerender } = renderWithTheme(
        <AppbarSidebar color="standard">
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      // Initially standard theme
      const mainContainer = container.firstChild as HTMLElement;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#E3E2E9' });

      // Switch to transitional theme
      rerender(
        <ThemeProvider theme={createTheme()}>
          <AppbarSidebar color="transitional">
            <div data-testid="content">Content</div>
          </AppbarSidebar>
        </ThemeProvider>
      );

      // Background should update
      expect(mainContainer).toHaveStyle({ backgroundColor: '#F5F5F5' });
    });

    it('maintains component functionality across theme changes', () => {
      const { rerender } = renderWithTheme(
        <AppbarSidebar color="standard">
          <div data-testid="content">Standard Theme Content</div>
        </AppbarSidebar>
      );

      // Verify components work in standard theme
      expect(screen.getByTestId('appbar-search')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();

      // Switch to transitional theme
      rerender(
        <ThemeProvider theme={createTheme()}>
          <AppbarSidebar color="transitional">
            <div data-testid="content">Transitional Theme Content</div>
          </AppbarSidebar>
        </ThemeProvider>
      );

      // Verify components still work in transitional theme
      expect(screen.getByTestId('appbar-search')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('Transitional Theme Content')).toBeInTheDocument();
    });
  });

  describe('sidebar toggle workflow', () => {
    it('completes full sidebar toggle interaction with layout updates', async () => {
      const user = userEvent.setup();
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Page Content</div>
        </AppbarSidebar>
      );

      const sidebar = screen.getByRole('list');
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      const contentArea = screen.getByTestId('content').parentElement?.parentElement;
      const arrowIcon = screen.getByTestId('arrow-left-icon');

      // Initial state - collapsed
      expect(sidebar).toHaveStyle({ width: '48px' });
      expect(contentArea).toHaveStyle({ width: 'calc(100% - 48px)' });
      expect(arrowIcon).toHaveStyle({ transform: 'rotate(180deg)' });

      // Click to expand
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '205px' });
      });

      await waitFor(() => {
        expect(contentArea).toHaveStyle({ width: 'calc(100% - 205px)' });
      });

      await waitFor(() => {
        expect(arrowIcon).toHaveStyle({ transform: 'none' });
      });

      // Click to collapse again
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '48px' });
      });

      await waitFor(() => {
        expect(contentArea).toHaveStyle({ width: 'calc(100% - 48px)' });
      });

      await waitFor(() => {
        expect(arrowIcon).toHaveStyle({ transform: 'rotate(180deg)' });
      });
    });

    it('synchronizes navigation text visibility with sidebar state', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      const dashboardText = screen.getByText('Dashboard');
      const analyticsText = screen.getByText('Analytics');

      // Initially collapsed - text should be hidden
      expect(dashboardText).toHaveStyle({ width: '0px' });
      expect(analyticsText).toHaveStyle({ width: '0px' });

      // Click to expand
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(dashboardText).toHaveStyle({ width: 'auto' });
        expect(analyticsText).toHaveStyle({ width: 'auto' });
      });

      // Click to collapse
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(dashboardText).toHaveStyle({ width: '0px' });
        expect(analyticsText).toHaveStyle({ width: '0px' });
      });
    });
  });

  describe('cross-component communication', () => {
    it('maintains context state consistency across all components', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar color="standard">
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      
      // Verify initial context state is reflected in all components
      const { container } = render(
        <ThemeProvider theme={createTheme()}>
          <AppbarSidebar color="standard">
            <div data-testid="content">Content</div>
          </AppbarSidebar>
        </ThemeProvider>
      );

      const mainContainer = container.firstChild as HTMLElement;
      const sidebar = screen.getByRole('list');
      
      // Standard color should be applied everywhere
      expect(mainContainer).toHaveStyle({ backgroundColor: '#E3E2E9' });
      expect(sidebar).toHaveStyle({ width: '48px' });

      // Toggle sidebar and verify context updates are reflected
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '205px' });
      });
    });

    it('handles rapid state changes without inconsistencies', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      const sidebar = screen.getByRole('list');

      // Rapid clicks
      await user.click(toggleButton!);
      await user.click(toggleButton!);
      await user.click(toggleButton!);

      // Should end up in expanded state (odd number of clicks)
      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '205px' });
      });
    });
  });

  describe('user interaction flows', () => {
    it('supports search interaction independently of sidebar state', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const searchInput = screen.getByTestId('appbar-search');
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');

      // Search should work in collapsed state
      await user.type(searchInput, 'test search');
      expect(searchInput).toHaveValue('test search');

      // Toggle sidebar
      await user.click(toggleButton!);

      // Search should still work in expanded state
      await user.clear(searchInput);
      await user.type(searchInput, 'expanded search');
      expect(searchInput).toHaveValue('expanded search');
    });

    it('maintains icon button accessibility across sidebar states', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const iconButtons = screen.getAllByTestId('icon-button');
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');

      // All icon buttons should be clickable in collapsed state
      expect(iconButtons.length).toBeGreaterThan(0);
      iconButtons.forEach(button => {
        expect(button).toBeEnabled();
      });

      // Toggle to expanded state
      await user.click(toggleButton!);

      // Icon buttons should still be clickable in expanded state
      const expandedIconButtons = screen.getAllByTestId('icon-button');
      expandedIconButtons.forEach(button => {
        expect(button).toBeEnabled();
      });
    });
  });

  describe('layout coordination', () => {
    it('coordinates layout changes smoothly across components', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content" style={{ minHeight: '500px' }}>
            <h1>Page Title</h1>
            <p>This is some content that should reflow properly.</p>
          </div>
        </AppbarSidebar>
      );

      const sidebar = screen.getByRole('list');
      const contentArea = screen.getByTestId('content').parentElement?.parentElement;
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');

      // Verify initial layout
      expect(sidebar).toHaveStyle({ width: '48px' });
      expect(contentArea).toHaveStyle({ width: 'calc(100% - 48px)' });

      // Toggle and verify coordinated layout change
      await user.click(toggleButton!);

      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '205px' });
        expect(contentArea).toHaveStyle({ width: 'calc(100% - 205px)' });
      });

      // Content should still be accessible and properly laid out
      expect(screen.getByText('Page Title')).toBeInTheDocument();
      expect(screen.getByText('This is some content that should reflow properly.')).toBeInTheDocument();
    });

    it('handles content overflow gracefully in both sidebar states', () => {
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">
            {Array.from({ length: 50 }, (_, i) => (
              <p key={i}>This is paragraph {i + 1} with some content.</p>
            ))}
          </div>
        </AppbarSidebar>
      );

      const contentContainer = screen.getByTestId('content').parentElement;
      
      // Content should be scrollable
      expect(contentContainer).toHaveStyle({ height: '100%' });
      
      // All paragraphs should be rendered
      expect(screen.getByText('This is paragraph 1 with some content.')).toBeInTheDocument();
      expect(screen.getByText('This is paragraph 50 with some content.')).toBeInTheDocument();
    });
  });

  describe('accessibility integration', () => {
    it('maintains proper focus management during interactions', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">
            <button>Content Button 1</button>
            <button>Content Button 2</button>
          </div>
        </AppbarSidebar>
      );

      const searchInput = screen.getByTestId('appbar-search');
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      const contentButton = screen.getByText('Content Button 1');

      // Test tab order
      await user.tab();
      // Focus should move through interactive elements

      // Toggle sidebar shouldn't break focus management
      await user.click(toggleButton!);
      
      // Content should still be focusable
      contentButton.focus();
      expect(contentButton).toHaveFocus();
    });

    it('provides proper semantic structure throughout component tree', () => {
      renderWithTheme(
        <AppbarSidebar>
          <main data-testid="main-content">
            <nav aria-label="breadcrumb">
              <ol>
                <li><a href="/">Home</a></li>
                <li>Current Page</li>
              </ol>
            </nav>
            <h1>Page Title</h1>
            <section>
              <h2>Section Title</h2>
              <p>Section content</p>
            </section>
          </main>
        </AppbarSidebar>
      );

      // Verify semantic landmarks
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Appbar
      expect(screen.getByRole('list')).toBeInTheDocument(); // Sidebar nav
      expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
      expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument();
      
      // Verify heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });
  });

  describe('performance and animations', () => {
    it('handles multiple rapid interactions without performance degradation', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">
            <div style={{ height: '2000px' }}>Tall content</div>
          </div>
        </AppbarSidebar>
      );

      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');
      
      // Perform multiple rapid interactions
      for (let i = 0; i < 5; i++) {
        await user.click(toggleButton!);
        // Small delay to allow for animation
        await waitFor(() => {}, { timeout: 100 });
      }

      // Component should still be responsive
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('maintains smooth visual transitions', async () => {
      const user = userEvent.setup();
      
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );

      const sidebar = screen.getByRole('list');
      const toggleButton = screen.getByTestId('arrow-left-icon').closest('li');

      // Verify transition properties are applied
      expect(sidebar).toHaveStyle({ transition: 'width 0.2s' });

      // Trigger transition
      await user.click(toggleButton!);

      // Transition should complete smoothly
      await waitFor(() => {
        expect(sidebar).toHaveStyle({ width: '205px' });
      }, { timeout: 1000 });
    });
  });
});
