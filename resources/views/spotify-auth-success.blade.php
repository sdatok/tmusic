<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Spotify Authorization Success</title>
</head>
<body>
<script>
    // Parse the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const expiresIn = params.get('expiresIn');

    // Store the token and expiry time in localStorage
    if (token && expiresIn) {
        const expiryTime = new Date().getTime() + parseInt(expiresIn) * 1000;
        localStorage.setItem('spotifyAccessToken', token);
        localStorage.setItem('spotifyTokenExpiry', expiryTime.toString());

        // Redirect back to the dashboard
        window.location.href = '/dashboard';
    } else {
        // Handle error or missing token
        console.error('Spotify authorization failed or token missing.');
    }
</script>
</body>
</html>
