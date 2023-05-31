import styled from "@emotion/styled";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

interface Row {
  [key: string]: string | number | object | undefined | null;
}

export interface Column {
  field: string;
  headerName: string;
}

type Props = {
  rows: Row[];
  columns: GridColDef<Row>[];
};

const Container = styled.div({
  height: 400,
  "& .MuiDataGrid-root .MuiDataGrid-columnSeparator": {
    visibility: "visible",
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
  },
});

const DataTable = ({ rows, columns }: Props) => {
  return (
    <Container>
      <DataGrid rows={rows} columns={columns} />
    </Container>
  );
};

export default DataTable;
