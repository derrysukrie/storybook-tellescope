// components/Menu/Menu.tsx
import React, { useState, createContext, useContext } from "react";
import { Menu as MuiMenu, Divider, Stack, type MenuProps } from "@mui/material";
import { SearchField } from "./components";
import { ItemCheckbox, ItemSwitch, Item, SubMenuItem } from "./items";

// Create density context
const DensityContext = createContext<{ dense: boolean }>({ dense: false });

export const useDensity = () => useContext(DensityContext);

type Props = MenuProps & {
  search?: boolean;
  dense?: boolean;
};

const MenuComponent: React.FC<Props> = ({
  search = false,
  dense = false,
  children,
  ...props
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (searchQuery && React.isValidElement(child)) {
      const { searchableText, children: childChildren } = child.props as {
        searchableText?: string;
        children: React.ReactNode;
      };
      const childText =
        searchableText ||
        (typeof childChildren === "string" ? childChildren : "");
      return childText.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <DensityContext.Provider value={{ dense }}>
      <MuiMenu 
        {...props}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '6px',
            overflow: 'hidden'
          },
          ...props.sx
        }}
      >
        {search && (
          <>
            <SearchField
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              dense={dense}
            />
            <Divider sx={{ mb: 1 }} />
          </>
        )}

        <Stack display="flex" gap={0} flexDirection="column">
          {filteredChildren}
        </Stack>
      </MuiMenu>
    </DensityContext.Provider>
  );
};

export const Menu = Object.assign(MenuComponent, {
  Item,
  SubMenu: SubMenuItem,
  Switch: ItemSwitch,
  Checkbox: ItemCheckbox,
});
