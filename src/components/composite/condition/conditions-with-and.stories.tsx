import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import ConditionsWithAnd from "./conditions-with-and";
import { QueryContextProvider } from "@/components/hooks/query/use-query";
import { DataContextProvider } from "@/components/hooks/data/use-data";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof ConditionsWithAnd> = {
  title: "Composite/Condition",
  component: ConditionsWithAnd,
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

type Story = StoryObj<typeof ConditionsWithAnd>;

export const ConditionListWithAnd: Story = {
  args: {},
};
