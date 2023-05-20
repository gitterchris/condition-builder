import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Input from ".";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Input> = {
  title: "Atomic/Input",
  component: Input,
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

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Value",
  },
};

export const InputWithHelperText: Story = {
  args: {
    label: "Url",
    helperText:
      "Insert data url. Returning data MUST be an array json with each element is key/value pair.",
  },
};
