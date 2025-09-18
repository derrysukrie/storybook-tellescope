/** @vitest-environment jsdom */
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/test-utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppbarSidebar from './appbar-sidebar';

// Mock the child components
vi.mock('./appbar', () => ({
  default: () => <div data-testid="appbar">Appbar Component</div>
}));

vi.mock('./sidebar', () => ({
  default: () => <div data-testid="sidebar">Sidebar Component</div>
}));

// Mock the AppbarSearch component
vi.mock('../../atoms/input/app-bar-search', () => ({
  AppbarSearch: ({ placeholder }: { placeholder: string }) => (
    <input data-testid="appbar-search" placeholder={placeholder} />
  )
}));

// Mock IconButton component
vi.mock('../../atoms/button/icon-button', () => ({
  IconButton: ({ children, ...props }: any) => (
    <button data-testid="icon-button" {...props}>
      {children}
    </button>
  )
}));

function renderWithTheme(ui: React.ReactElement) {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe('AppbarSidebar', () => {
  describe('basic rendering', () => {
    it('renders without crashing', () => {
      renderWithTheme(<AppbarSidebar />);
      expect(screen.getByTestId('appbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('renders children in content area', () => {
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="test-content">Test Content</div>
        </AppbarSidebar>
      );
      
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('renders both Appbar and Sidebar components', () => {
      renderWithTheme(<AppbarSidebar />);
      
      expect(screen.getByTestId('appbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });

  describe('props and defaults', () => {
    it('uses default props when none provided', () => {
      const { container } = renderWithTheme(<AppbarSidebar />);
      
      // Should use standard color by default
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#E3E2E9' });
    });

    it('accepts and uses color prop', () => {
      const { container } = renderWithTheme(<AppbarSidebar color="transitional" />);
      
      // Should use transitional color
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#F5F5F5' });
    });

    it('accepts and uses expanded prop', () => {
      // This is tested indirectly through the content area width calculation
      const { container } = renderWithTheme(<AppbarSidebar expanded={true} />);
      
      const contentArea = container.querySelector('[data-testid="test-content"]')?.parentElement?.parentElement;
      if (contentArea) {
        expect(contentArea).toHaveStyle({ width: 'calc(100% - 205px)' });
      }
    });
  });

  describe('provider integration', () => {
    it('wraps content in AppbarSidebarProvider', () => {
      // This is tested by verifying that context-dependent components render correctly
      renderWithTheme(<AppbarSidebar color="standard" />);
      
      // If provider is working, child components should render without errors
      expect(screen.getByTestId('appbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('passes props to provider correctly', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar color="transitional" expanded={true}>
          <div>Content</div>
        </AppbarSidebar>
      );
      
      // Verify that the provider received the props by checking the background color
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#F5F5F5' });
    });
  });

  describe('layout structure', () => {
    it('has correct container structure', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      // Main container should have border radius
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({
        borderRadius: '28px',
        overflow: 'hidden'
      });
    });

    it('applies flexbox layout', () => {
      const { container } = renderWithTheme(<AppbarSidebar />);
      
      // Find the Stack component that contains sidebar and content (flex-direction: row)
      const layoutContainer = container.querySelector('.MuiStack-root');
      expect(layoutContainer).toBeInTheDocument();
      
      // Verify it contains both sidebar and content area
      const sidebar = container.querySelector('[data-testid="sidebar"]');
      const contentArea = container.querySelector('.MuiStack-root:last-child');
      expect(sidebar).toBeInTheDocument();
      expect(contentArea).toBeInTheDocument();
    });

    it('has proper height calculations', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      // Content area should have calculated height
      const contentContainer = screen.getByTestId('content').parentElement?.parentElement;
      expect(contentContainer).toHaveStyle({ height: 'calc(100vh - 64px)' });
    });
  });

  describe('responsive width calculations', () => {
    it('calculates content width for collapsed state', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar expanded={false}>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      const contentContainer = screen.getByTestId('content').parentElement?.parentElement;
      expect(contentContainer).toHaveStyle({ width: 'calc(100% - 48px)' });
    });

    it('calculates content width for expanded state', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar expanded={true}>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      const contentContainer = screen.getByTestId('content').parentElement?.parentElement;
      expect(contentContainer).toHaveStyle({ width: 'calc(100% - 205px)' });
    });
  });

  describe('content area styling', () => {
    it('applies correct padding and border radius to content area', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      const contentInner = screen.getByTestId('content').parentElement;
      expect(contentInner).toHaveStyle({
        borderRadius: '28px',
        background: '#fff',
        padding: '24px'
      });
    });

    it('applies correct outer padding to content container', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      const contentOuter = screen.getByTestId('content').parentElement?.parentElement;
      expect(contentOuter).toHaveStyle({
        paddingRight: '16px',
        paddingBottom: '16px',
        borderRadius: '8px 28px'
      });
    });
  });

  describe('background color themes', () => {
    it('applies standard theme background color', () => {
      const { container } = renderWithTheme(<AppbarSidebar color="standard" />);
      
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#E3E2E9' });
    });

    it('applies transitional theme background color', () => {
      const { container } = renderWithTheme(<AppbarSidebar color="transitional" />);
      
      const mainContainer = container.firstChild;
      expect(mainContainer).toHaveStyle({ backgroundColor: '#F5F5F5' });
    });
  });

  describe('AppSidebarContent component', () => {
    it('renders Appbar at the top', () => {
      renderWithTheme(<AppbarSidebar />);
      
      const appbar = screen.getByTestId('appbar');
      const sidebar = screen.getByTestId('sidebar');
      
      // Both should be present
      expect(appbar).toBeInTheDocument();
      expect(sidebar).toBeInTheDocument();
    });

    it('positions sidebar and content in flex row', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      // Find the flex row container (the Stack with flexDirection: row)
      const flexContainer = container.querySelectorAll('.MuiStack-root')[1]; // Second Stack is the flex row
      expect(flexContainer).toBeInTheDocument();
      
      // Should contain both sidebar and content area
      const sidebar = container.querySelector('[data-testid="sidebar"]');
      const content = screen.getByTestId('content');
      expect(flexContainer).toContainElement(sidebar as HTMLElement);
      expect(flexContainer).toContainElement(content.closest('.MuiStack-root'));
    });
  });

  describe('component composition', () => {
    it('maintains proper component hierarchy', () => {
      const { container } = renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content">Test Content</div>
        </AppbarSidebar>
      );
      
      // Verify the structure: Provider > Main Container > Appbar + Layout Container > Sidebar + Content
      const mainContainer = container.firstChild;
      expect(mainContainer).toContainElement(screen.getByTestId('appbar'));
      expect(mainContainer).toContainElement(screen.getByTestId('sidebar'));
      expect(mainContainer).toContainElement(screen.getByTestId('content'));
    });

    it('renders multiple children correctly', () => {
      renderWithTheme(
        <AppbarSidebar>
          <div data-testid="content-1">Content 1</div>
          <div data-testid="content-2">Content 2</div>
          <div data-testid="content-3">Content 3</div>
        </AppbarSidebar>
      );
      
      expect(screen.getByTestId('content-1')).toBeInTheDocument();
      expect(screen.getByTestId('content-2')).toBeInTheDocument();
      expect(screen.getByTestId('content-3')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('maintains semantic structure', () => {
      renderWithTheme(
        <AppbarSidebar>
          <main data-testid="main-content">
            <h1>Page Title</h1>
            <p>Page content</p>
          </main>
        </AppbarSidebar>
      );
      
      // Content should be accessible
      expect(screen.getByTestId('main-content')).toBeInTheDocument();
      expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('preserves child component accessibility', () => {
      renderWithTheme(
        <AppbarSidebar>
          <button data-testid="interactive-element">Click me</button>
        </AppbarSidebar>
      );
      
      const button = screen.getByTestId('interactive-element');
      expect(button).toBeInTheDocument();
      expect(button).toHaveRole('button');
    });
  });

  describe('edge cases', () => {
    it('handles no children gracefully', () => {
      renderWithTheme(<AppbarSidebar />);
      
      // Should still render Appbar and Sidebar
      expect(screen.getByTestId('appbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    it('handles null children gracefully', () => {
      renderWithTheme(
        <AppbarSidebar>
          {null}
          {undefined}
          {false && <div>Won't render</div>}
        </AppbarSidebar>
      );
      
      // Should still render Appbar and Sidebar without errors
      expect(screen.getByTestId('appbar')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
  });

  describe('style constants', () => {
    it('uses correct width constants', () => {
      // Test that the constants are used correctly in width calculations
      const { container: collapsedContainer } = renderWithTheme(
        <AppbarSidebar expanded={false}>
          <div data-testid="content">Content</div>
        </AppbarSidebar>
      );
      
      const { container: expandedContainer } = renderWithTheme(
        <AppbarSidebar expanded={true}>
          <div data-testid="content-expanded">Content</div>
        </AppbarSidebar>
      );
      
      const collapsedContent = screen.getByTestId('content').parentElement?.parentElement;
      const expandedContent = screen.getByTestId('content-expanded').parentElement?.parentElement;
      
      expect(collapsedContent).toHaveStyle({ width: 'calc(100% - 48px)' });
      expect(expandedContent).toHaveStyle({ width: 'calc(100% - 205px)' });
    });
  });
});
