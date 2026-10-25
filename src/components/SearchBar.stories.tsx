import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { SearchBar } from './SearchBar'

const meta = {
  title: 'Components/SearchBar',
  component: SearchBar,
  args: {
    value: '',
    onChange: fn(),
    search: fn(),
  },
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    return (
      <SearchBar
        {...args}
        value={value}
        onChange={(event) => {
          args.onChange(event)
          updateArgs({ value: event.target.value })
        }}
      />
    )
  },
}
