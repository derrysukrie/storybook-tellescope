import { InputBase, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '../button/icon-button';


interface AppbarSearchProps {
    placeholder?: string;
}

export const AppbarSearch = ({ placeholder = "label" }: AppbarSearchProps) => {

    return (
        <Stack
            component="form"
            direction={"row"}
            gap={1}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: "100%",
                background: "#fff",
                borderRadius: 999
            }}
        >
            <InputBase
                sx={{
                    pl: "16px",
                    flex: 1,
                    ".MuiInputBase-input::placeholder": {
                        color: "#000 !important"
                    }
                }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': placeholder }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" color="secondary">
                <SearchIcon />
            </IconButton>
        </Stack>
    )
};
