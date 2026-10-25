import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AlertToast } from './AlertToast'

type ToastPreviewProps = {
  message: string
  alertType: 'info' | 'warning'
}

function ToastPreview({ message, alertType }: ToastPreviewProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div style={{ minHeight: 100 }}>
      <button
        type="button"
        disabled={isOpen}
        onClick={() => setIsOpen(true)}
      >
        Show toast
      </button>

      <AlertToast useIsOpen={[isOpen, setIsOpen]} alertType={alertType}>
        {message}
      </AlertToast>
    </div>
  )
}

const meta = {
  title: 'Components/AlertToast',
  component: ToastPreview,
  args: {
    message: 'Saved successfully',
    alertType: 'info',
  },
} satisfies Meta<typeof ToastPreview>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Warning: Story = {
  args: {
    message: 'Something needs your attention',
    alertType: 'warning',
  },
}
