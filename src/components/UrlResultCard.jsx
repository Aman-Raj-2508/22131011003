
import { Paper, Typography } from '@mui/material';

export default function URLResultCard({ result }) {
    return (
        <Paper sx={{ p: 2, mt: 1 }}>
            <Typography>
                Short URL: <a href={`/${result.code}`}>{`http://localhost:3000/${result.code}`}</a>
            </Typography>
            <Typography>
                Expires At: {new Date(result.expiresAt).toLocaleString()}
            </Typography>
        </Paper>
    );
}
