import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import type { ChangeEvent } from 'react'

interface SearchBarProps {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    search: () => void
}

function SearchBar({ value, onChange, search }: SearchBarProps) {

    return (
        <TextField
            label="Search"
            value={value}
            onChange={(event) => onChange(event)}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    search()
                }
            }}
            fullWidth
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton type="button" aria-label="Search" onClick={search}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    )
}

export { SearchBar }
