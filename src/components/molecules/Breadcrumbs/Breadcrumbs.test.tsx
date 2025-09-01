/** @vitest-environment jsdom */

import { describe, it, expect, vi, afterEach, afterAll } from 'vitest';
import { render } from '../../../../test/test-utils';
import { screen } from '@testing-library/react';
import { Breadcrumbs } from './Breadcrumbs';
import { Home, Search, Settings } from '@mui/icons-material';

// Mock console.log to avoid noise in tests
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Breadcrumbs Component', () => {
  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe('Props Testing', () => {
    describe('levels prop', () => {
      it('renders with default level 3', () => {
        render(<Breadcrumbs />);
        
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
      });

      it('renders with level 1', () => {
        render(<Breadcrumbs levels={1} />);
        
        expect(screen.getByText('Current Page')).toBeInTheDocument();
        expect(screen.queryByText('Home')).not.toBeInTheDocument();
        expect(screen.queryByText('Products')).not.toBeInTheDocument();
      });

      it('renders with level 2', () => {
        render(<Breadcrumbs levels={2} />);
        
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
        expect(screen.queryByText('Products')).not.toBeInTheDocument();
      });

      it('renders with level 3', () => {
        render(<Breadcrumbs levels={3} />);
        
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Products')).toBeInTheDocument();
        expect(screen.getByText('Current Page')).toBeInTheDocument();
      });
    });

    describe('leftIcon prop', () => {
      it('renders without left icons by default', () => {
        render(<Breadcrumbs />);
        
        const iconButtons = screen.queryAllByRole('button');
        expect(iconButtons).toHaveLength(0);
      });

      it('renders with one left icon', () => {
        const leftIcon = [<Home key="home" />];
        render(<Breadcrumbs leftIcon={leftIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(1);
        expect(iconButtons[0]).toBeInTheDocument();
      });

      it('renders with two left icons', () => {
        const leftIcon = [<Home key="home" />, <Search key="search" />];
        render(<Breadcrumbs leftIcon={leftIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(2);
      });

      it('limits left icons to maximum 2', () => {
        const leftIcon = [
          <Home key="home" />,
          <Search key="search" />,
          <Settings key="settings" />
        ];
        render(<Breadcrumbs leftIcon={leftIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(2);
      });
    });

    describe('rightIcon prop', () => {
      it('renders without right icons by default', () => {
        render(<Breadcrumbs />);
        
        const iconButtons = screen.queryAllByRole('button');
        expect(iconButtons).toHaveLength(0);
      });

      it('renders with one right icon', () => {
        const rightIcon = [<Settings key="settings" />];
        render(<Breadcrumbs rightIcon={rightIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(1);
        expect(iconButtons[0]).toBeInTheDocument();
      });

      it('renders with two right icons', () => {
        const rightIcon = [<Search key="search" />, <Settings key="settings" />];
        render(<Breadcrumbs rightIcon={rightIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(2);
      });

      it('limits right icons to maximum 2', () => {
        const rightIcon = [
          <Home key="home" />,
          <Search key="search" />,
          <Settings key="settings" />
        ];
        render(<Breadcrumbs rightIcon={rightIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(2);
      });
    });

    describe('combined icons', () => {
      it('renders with both left and right icons', () => {
        const leftIcon = [<Home key="home" />];
        const rightIcon = [<Settings key="settings" />];
        render(<Breadcrumbs leftIcon={leftIcon} rightIcon={rightIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(2);
      });

      it('renders with maximum icons on both sides', () => {
        const leftIcon = [<Home key="home" />, <Search key="search" />];
        const rightIcon = [<Settings key="settings" />, <Home key="home2" />];
        render(<Breadcrumbs leftIcon={leftIcon} rightIcon={rightIcon} />);
        
        const iconButtons = screen.getAllByRole('button');
        expect(iconButtons).toHaveLength(4);
      });
    });
  });

  describe('Functionality Testing', () => {
    it('renders breadcrumb links with correct hrefs', () => {
      render(<Breadcrumbs levels={3} />);
      
      const homeLink = screen.getByText('Home');
      const productsLink = screen.getByText('Products');
      const currentPageLink = screen.getByText('Current Page');
      
      expect(homeLink).toHaveAttribute('href', '/');
      expect(productsLink).toHaveAttribute('href', '/products');
      expect(currentPageLink).toHaveAttribute('href', '/current');
    });

    it('applies correct styling to active vs inactive links', () => {
      render(<Breadcrumbs levels={3} />);
      
      const homeLink = screen.getByText('Home');
      const productsLink = screen.getByText('Products');
      const currentPageLink = screen.getByText('Current Page');
      
      // Active link should have black color and aria-current="page"
      expect(currentPageLink).toHaveAttribute('aria-current', 'page');
      
      // Inactive links should not have aria-current
      expect(homeLink).not.toHaveAttribute('aria-current');
      expect(productsLink).not.toHaveAttribute('aria-current');
    });

    it('handles icon button clicks', async () => {
      const leftIcon = [<Home key="home" />];
      render(<Breadcrumbs leftIcon={leftIcon} />);
      
      const iconButton = screen.getByRole('button');
      iconButton.click();
      
      expect(consoleSpy).toHaveBeenCalledWith('Icon 1 clicked');
    });

    it('handles multiple icon button clicks', async () => {
      const leftIcon = [<Home key="home" />, <Search key="search" />];
      render(<Breadcrumbs leftIcon={leftIcon} />);
      
      const iconButtons = screen.getAllByRole('button');
      
      iconButtons[0].click();
      expect(consoleSpy).toHaveBeenCalledWith('Icon 1 clicked');
      
      iconButtons[1].click();
      expect(consoleSpy).toHaveBeenCalledWith('Icon 2 clicked');
    });
  });

  describe('Accessibility Testing', () => {
    it('has correct aria-label for breadcrumbs', () => {
      render(<Breadcrumbs />);
      
      const breadcrumbsElement = screen.getByLabelText('breadcrumb');
      expect(breadcrumbsElement).toBeInTheDocument();
    });

    it('has correct aria-current for active page', () => {
      render(<Breadcrumbs levels={2} />);
      
      const currentPageLink = screen.getByText('Current Page');
      expect(currentPageLink).toHaveAttribute('aria-current', 'page');
    });

    it('renders icon buttons with correct size', () => {
      const leftIcon = [<Home key="home" />];
      render(<Breadcrumbs leftIcon={leftIcon} />);
      
      const iconButton = screen.getByRole('button');
      // Material-UI IconButton with size="small" should be present
      expect(iconButton).toBeInTheDocument();
      // The size prop is applied internally by Material-UI, not as a DOM attribute
      expect(iconButton).toHaveClass('MuiIconButton-sizeSmall');
    });
  });

  describe('Layout Testing', () => {
    it('renders with correct structure', () => {
      render(<Breadcrumbs />);
      
      // Should have breadcrumbs and potentially icons
      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
    });

    it('maintains proper spacing between elements', () => {
      const leftIcon = [<Home key="home" />];
      const rightIcon = [<Settings key="settings" />];
      render(<Breadcrumbs leftIcon={leftIcon} rightIcon={rightIcon} />);
      
      // Should render without errors and maintain layout
      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty icon arrays gracefully', () => {
      render(<Breadcrumbs leftIcon={[]} rightIcon={[]} />);
      
      const iconButtons = screen.queryAllByRole('button');
      expect(iconButtons).toHaveLength(0);
    });

    it('handles undefined icon props gracefully', () => {
      render(<Breadcrumbs leftIcon={undefined} rightIcon={undefined} />);
      
      const iconButtons = screen.queryAllByRole('button');
      expect(iconButtons).toHaveLength(0);
    });

    it('renders with only breadcrumbs when no icons provided', () => {
      render(<Breadcrumbs levels={1} />);
      
      expect(screen.getByText('Current Page')).toBeInTheDocument();
      expect(screen.queryAllByRole('button')).toHaveLength(0);
    });
  });
});
