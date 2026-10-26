
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// Limit options until specified in the future
interface AlertToastProps {
  useIsOpen: [boolean, (isOpen: boolean) => void]
  children: React.ReactNode
  alertType?: 'warning' | 'info' | 'error'
}

function AlertToast({ useIsOpen, children, alertType = 'info' }: AlertToastProps) {
  const [isOpen, setIsOpen] = useIsOpen

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={2000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={alertType}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {children}
      </Alert>
    </Snackbar>
  )
}

export { AlertToast }
