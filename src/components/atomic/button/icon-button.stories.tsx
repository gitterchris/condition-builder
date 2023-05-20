import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import * as Button from ".";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Button.Icon> = {
  title: "Atomic/Buttons",
  component: Button.Icon,
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

type Story = StoryObj<typeof Button.Icon>;

export const AddIcon: Story = {
  args: {
    type: "add",
  },
};

export const DeleteIcon: Story = {
  args: {
    type: "delete",
  },
};
