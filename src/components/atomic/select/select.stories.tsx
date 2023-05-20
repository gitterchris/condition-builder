import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Select from ".";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Select> = {
  title: "Atomic/Select",
  component: Select,
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

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Left Condition",
    menuItems: [
      {
        text: "name",
        value: "name",
      },
      {
        text: "id",
        value: "id",
      },
    ],
  },
};

export const WithDefaultValue: Story = {
  args: {
    ...Default.args,
    initialValue: "name",
  },
};
