// components/AlertSnackbar.jsx
import { Snackbar, Alert } from '@mui/material';

export default function ErrorSnackbar({ open, message, onClose, severity = 'error' }) {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={onClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
