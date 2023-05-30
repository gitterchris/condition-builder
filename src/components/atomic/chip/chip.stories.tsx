import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Chip from ".";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Chip> = {
  title: "Atomic/Chip",
  component: Chip,
  /*
    For some reason, I am getting TS errors when adding this as a Global decorator.
    Adding it here everytime for now.
  */
  decorators: [
    (Story: any) => (
      <Wrapper>
        <Story />
      </Wrapper>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    text: "Total: 1000",
  },
};

export const ColoredChip: Story = {
  args: {
    ...Default.args,
    primary: true,
  },
};
