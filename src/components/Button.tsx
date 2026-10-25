import MuiButton from '@mui/material/Button'
import type { MouseEventHandler } from 'react'

interface ButtonProps {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>
}

function Button({ children, onClick }: ButtonProps) {

    return (
        <MuiButton onClick={onClick} variant="outlined">{children}</MuiButton>
    )

}

export { Button }
