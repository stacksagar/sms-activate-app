import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { uid } from 'uid';

interface Props {
  headers?: string[];
  children: React.ReactNode;
  size?: 'small' | 'medium';
}

export default function BasicTable({ size, headers, children }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="products table" size={size}>
        {headers?.length ? (
          <TableHead>
            <TableRow>
              {headers.map((h) => (
                <TableCell className="whitespace-nowrap" key={uid()}>
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}
