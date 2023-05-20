import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import * as Button from ".";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Button.Outlined> = {
  title: "Atomic/Buttons",
  component: Button.Outlined,
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

type Story = StoryObj<typeof Button.Outlined>;

export const Outlined: Story = {
  args: {
    label: "Outlined",
  },
};

export const ButtonWithIcon: Story = {
  args: {
    label: "AND",
    icon: "add",
  },
};
