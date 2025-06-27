import { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { logAction } from '../utils/loggerMiddlewares';
import { isValidURL, isValidMinutes, isValidShortCode } from '../utils/validator';
import { generateShortCode } from '../utils/shortCodeGenerator';

export default function Home() {
    const [urls, setUrls] = useState([{ url: '', code: '', minutes: '' }]);
    const [results, setResults] = useState([]);
    const [shortened, setShortened] = useState({});

    const handleAdd = () => {
        if (urls.length < 5) setUrls([...urls, { url: '', code: '', minutes: '' }]);
    };

    const handleChange = (i, field, value) => {
        const newUrls = [...urls];
        newUrls[i][field] = value;
        setUrls(newUrls);
    };

    const handleSubmit = () => {
        const existingCodes = new Set(Object.keys(shortened));
        const newResults = [];
        const newCodesInThisBatch = new Set();

        for (let { url, code, minutes } of urls) {
            if (!isValidURL(url)) {
                alert('Invalid URL');
                return;
            }
            if (code && !isValidShortCode(code)) {
                alert('Invalid Shortcode');
                return;
            }
            if (minutes && !isValidMinutes(Number(minutes))) {
                alert('Invalid validity time');
                return;
            }

            const finalCode = code || generateShortCode(existingCodes);
            if (shortened[finalCode] || newCodesInThisBatch.has(finalCode)) {
                alert(`Shortcode ${finalCode} already exists`);
                return;
            }

            const expiresAt = new Date(Date.now() + (Number(minutes || 30) * 60000));
            const entry = { originalUrl: url, code: finalCode, expiresAt };

            logAction("URL_SHORTENED", entry);
            newResults.push(entry);
            existingCodes.add(finalCode);
            newCodesInThisBatch.add(finalCode);
        }

        const newMap = {};
        newResults.forEach(item => newMap[item.code] = item);
        setShortened(prev => ({ ...prev, ...newMap }));
        setResults(newResults);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, mt: 2 }}>
            <Typography variant="h5" gutterBottom>Shorten Your URLs</Typography>
            {urls.map((item, i) => (
                <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="Long URL"
                            value={item.url}
                            onChange={(e) => handleChange(i, 'url', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Shortcode (optional)"
                            value={item.code}
                            onChange={(e) => handleChange(i, 'code', e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            fullWidth
                            label="Validity (min)"
                            type="number"
                            value={item.minutes}
                            onChange={(e) => handleChange(i, 'minutes', e.target.value)}
                        />
                    </Grid>
                </Grid>
            ))}
            <Button onClick={handleAdd} disabled={urls.length >= 5}>Add Another</Button>
            <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>Shorten</Button>

            <div style={{ marginTop: 20 }}>
                {results.map((res, idx) => (
                    <Paper key={idx} sx={{ p: 2, mt: 1 }}>
                        <Typography>
                            Short URL: <a href={`/${res.code}`}>{`http://localhost:3000/${res.code}`}</a>
                        </Typography>
                        <Typography>
                            Expires At: {new Date(res.expiresAt).toLocaleString()}
                        </Typography>
                    </Paper>
                ))}
            </div>
        </Paper>
    );
}
