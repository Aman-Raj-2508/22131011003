
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logAction } from '../utils/loggerMiddlewares';

export default function Redirector({ mapping }) {
    const { code } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const entry = mapping[code];
        if (!entry) {
            alert("Invalid or expired link");
            return navigate('/');
        }

        const now = new Date();
        if (new Date(entry.expiresAt) < now) {
            alert("Link expired");
            return navigate('/');
        }

        logAction("URL_REDIRECTED", { code, to: entry.originalUrl });
        window.location.href = entry.originalUrl;
    }, [code]);

    return null;
}