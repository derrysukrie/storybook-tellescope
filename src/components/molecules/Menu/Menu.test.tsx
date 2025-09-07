import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, Divider } from '@mui/material';
import { Menu } from './Menu';

const setupOpenMenu = async (ui: React.ReactNode) => {
  const user = userEvent.setup();
  render(
    <div>
      <Button data-testid="open-btn">Open</Button>
      {ui}
    </div>
  );
  const button = screen.getByTestId('open-btn');
  await user.click(button);
  return user;
};

describe('Menu - rendering & basic props', () => {
  it('does not render content when closed', () => {
    render(
      <Menu anchorEl={document.body} open={false} onClose={() => {}}>
        <Menu.Item>Item</Menu.Item>
      </Menu>
    );
    expect(screen.queryByText('Item')).toBeNull();
  });

  it('renders when open and calls onClose on Escape', async () => {
    const onClose = vi.fn();
    const user = await setupOpenMenu(
      <Menu anchorEl={document.body} open onClose={onClose}>
        <Menu.Item>Item</Menu.Item>
      </Menu>
    );
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Menu - search', () => {
  it('renders search input only when search=true', () => {
    const { rerender } = render(
      <Menu anchorEl={document.body} open search onClose={() => {}}>
        <Menu.Item>Alpha</Menu.Item>
      </Menu>
    );
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();

    rerender(
      <Menu anchorEl={document.body} open search={false} onClose={() => {}}>
        <Menu.Item>Alpha</Menu.Item>
      </Menu>
    );
    expect(screen.queryByPlaceholderText(/search/i)).toBeNull();
  });

  it('filters by children text (case-insensitive)', async () => {
    render(
      <Menu anchorEl={document.body} open search onClose={() => {}}>
        <Menu.Item>Alpha</Menu.Item>
        <Menu.Item>Bravo</Menu.Item>
      </Menu>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'brA');
    expect(screen.queryByText('Alpha')).toBeNull();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
  });

  it('filters using searchableText prop across items', async () => {
    render(
      <Menu anchorEl={document.body} open search onClose={() => {}}>
        <Menu.Item searchableText="first">X</Menu.Item>
        <Menu.Checkbox searchableText="second" checked>
          Second
        </Menu.Checkbox>
        <Menu.Switch searchableText="third" checked>
          Third
        </Menu.Switch>
      </Menu>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'second');

    // Only the checkbox should remain visible
    expect(screen.queryByText('X')).toBeNull();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.queryByText('Third')).toBeNull();
  });

  it('hides non-text elements like Divider during search', async () => {
    render(
      <Menu anchorEl={document.body} open search onClose={() => {}}>
        <Menu.Item>Alpha</Menu.Item>
        <Divider />
        <Menu.Item>Bravo</Menu.Item>
      </Menu>
    );
    const input = screen.getByPlaceholderText(/search/i);
    await userEvent.type(input, 'alp');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    // Only Alpha remains visible
    const items = screen.getAllByRole('menuitem');
    expect(items).toHaveLength(1);
  });
});

describe('Menu - density', () => {
  it('applies dense styles to items', () => {
    render(
      <Menu anchorEl={document.body} open search dense onClose={() => {}}>
        <Menu.Item>Dense Item</Menu.Item>
        <Menu.Checkbox checked>Dense Checkbox</Menu.Checkbox>
        <Menu.Switch checked>Dense Switch</Menu.Switch>
      </Menu>
    );
    const items = screen.getAllByRole('menuitem');
    items.forEach((el) => {
      expect(el).toHaveStyle({ minHeight: '32px' });
    });
  });
});

describe('Menu.Item', () => {
  it('renders icon and shows selected state', () => {
    render(
      <Menu anchorEl={document.body} open onClose={() => {}}>
        <Menu.Item selected icon={<span data-testid="ic" />}>Row</Menu.Item>
      </Menu>
    );
    expect(screen.getByTestId('ic')).toBeInTheDocument();
    const row = screen.getByText('Row').closest('[role="menuitem"]');
    expect(row).toHaveClass('Mui-selected');
  });

  it('fires onClick', async () => {
    const onClick = vi.fn();
    render(
      <Menu anchorEl={document.body} open onClose={() => {}}>
        <Menu.Item onClick={onClick}>Click me</Menu.Item>
      </Menu>
    );
    await userEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Menu.Checkbox', () => {
  it('reflects checked state and calls onClick', async () => {
    const onClick = vi.fn();
    render(
      <Menu anchorEl={document.body} open onClose={() => {}}>
        <Menu.Checkbox checked onClick={onClick}>Opt</Menu.Checkbox>
      </Menu>
    );
    const row = screen.getByText('Opt').closest('[role="menuitem"]');
    expect(row).toHaveClass('Mui-selected');
    await userEvent.click(row!);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Menu.Switch', () => {
  it('reflects checked state and calls onClick', async () => {
    const onClick = vi.fn();
    render(
      <Menu anchorEl={document.body} open onClose={() => {}}>
        <Menu.Switch checked onClick={onClick}>Toggle</Menu.Switch>
      </Menu>
    );
    const row = screen.getByText('Toggle').closest('[role="menuitem"]');
    expect(row).toHaveClass('Mui-selected');
    await userEvent.click(row!);
    expect(onClick).toHaveBeenCalled();
  });
});

describe('Menu.SubMenu', () => {
  it('opens nested menu on click and closes on Escape', async () => {
    render(
      <Menu anchorEl={document.body} open onClose={() => {}}>
        <Menu.SubMenu text="More">
          <Menu.Item>Nested 1</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
    const parent = screen.getByText('More').closest('[role="menuitem"]');
    await userEvent.click(parent!);
    expect(await screen.findByText('Nested 1')).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(await screen.findByText('Nested 1').catch(() => null)).toBeNull();
  });
});


