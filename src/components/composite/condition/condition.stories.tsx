import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Condition from ".";
import { Operators } from "@/utils/queries";
import { QueryContextProvider } from "@/components/hooks/query/use-query";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Condition> = {
  title: "Composite/Condition",
  component: Condition,
  /*
    For some reason, I am getting TS errors when adding this as a Global decorator.
    Adding it here everytime for now.
  */
  decorators: [
    (Story: any) => (
      <QueryContextProvider>
        <Wrapper>
          <Story />
        </Wrapper>
      </QueryContextProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Condition>;

const operators: Array<Operators> = [
  "Equals",
  "Greater than",
  "Less than",
  "Contain",
  "Not Contain",
  "Regex",
];

export const Default: Story = {
  args: {
    leftConditions: [
      {
        text: "name",
        value: "name",
      },
      {
        text: "id",
        value: "id",
      },
    ],
    operators: operators.map((o) => ({ text: o, value: o })),
  },
};

export const WithORInFront: Story = {
  args: {
    ...Default.args,
    showOr: true,
  },
};
