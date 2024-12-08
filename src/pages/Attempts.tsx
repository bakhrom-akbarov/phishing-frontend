import React, { useState } from 'react';
import { useListPhishingAttemptsQuery } from "../api/apiSlice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button } from '@mui/material';
import { Link } from "react-router-dom";

export const Attempts: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useListPhishingAttemptsQuery({ page, limit });

  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography color="error">Failed to load phishing attempts.</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Phishing Attempts
      </Typography>
      <Link to='/phishing'>Create phishing</Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((attempt) => (
              <TableRow key={attempt.id}>
                <TableCell>{attempt.email}</TableCell>
                <TableCell>{attempt.linkClicked ? 'Clicked' : 'Not Clicked'}</TableCell>
                <TableCell>{new Date(attempt.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          color="primary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
