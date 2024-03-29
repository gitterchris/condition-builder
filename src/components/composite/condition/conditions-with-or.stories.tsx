import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import ConditionsWithOr from "./conditions-with-or";
import { QueryContextProvider } from "@/components/hooks/query/use-query";
import { DataContextProvider } from "@/components/hooks/data/use-data";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof ConditionsWithOr> = {
  title: "Composite/Condition",
  component: ConditionsWithOr,
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

type Story = StoryObj<typeof ConditionsWithOr>;

export const ConditionListWithOr: Story = {
  args: {
    orConditions: [
      [
        "and_1",
        "or_1",
        { condition: "name", operator: "Contain", value: "Alm" },
      ],
      [
        "and_1",
        "or_2",
        { condition: "name", operator: "Contain", value: "Iron" },
      ],
    ],
  },
};
