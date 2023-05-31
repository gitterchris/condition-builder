import type { Meta, StoryObj } from "@storybook/react";
import styled from "@emotion/styled";
import Table from ".";
import { mockData } from "@/components/hooks/data/mock";
import { convertDates } from "@/utils/data";
import { KeyValuePair } from "@/utils/types";

const Wrapper = styled.div({
  margin: "26px",
});

const meta: Meta<typeof Table> = {
  title: "Atomic/Table",
  component: Table,
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

type Story = StoryObj<typeof Table>;

const columns = Object.keys(mockData[0]).map((key) => ({
  field: key,
  headerName: key,
}));

export const Default: Story = {
  args: {
    columns,
    rows: mockData.map((d) => convertDates(d as KeyValuePair)),
  },
};
