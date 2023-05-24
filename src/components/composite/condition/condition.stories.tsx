import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Condition from "./condition";
import { QueryContextProvider } from "@/components/hooks/query/use-query";
import { DataContextProvider } from "@/components/hooks/data/use-data";

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
      <DataContextProvider>
        <QueryContextProvider>
          <Wrapper>
            <Story />
          </Wrapper>
        </QueryContextProvider>
      </DataContextProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Condition>;

export const Default: Story = {
  args: {
    condition: [
      "and_1",
      "or_1",
      { condition: "name", operator: "Contain", value: "Alm" },
    ],
    index: 0,
  },
};

export const WithORInFront: Story = {
  args: {
    ...Default.args,
    index: 1,
  },
};
