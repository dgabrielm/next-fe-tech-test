import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import placeHolderImage from '../assets/album-placeholder.png'

interface SongCardProps {
    songTitle: string
    albumName: string
    artistName: string
    albumCoverURL: string
    audioSample: string
}

function SongCard({ songTitle, albumName, artistName, albumCoverURL, audioSample }: SongCardProps) {
    return (
        <Card sx={{ display: 'flex', width: '100%', height: 210, overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <CardContent sx={{ flex: 1, minWidth: 0, p: 1.5 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                        }}
                    >
                        {songTitle}
                    </Typography>

                    <Typography variant="subtitle1" color="text.secondary" noWrap>
                        {artistName}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary" noWrap>
                        {albumName}
                    </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    {/* iTunes licence allows us to provide the samples as a stream but not as a download */}
                    <audio
                        style={{ width: '100%', maxWidth: 230 }}
                        controls
                        controlsList="nodownload noremoteplayback"
                        src={audioSample}
                    />
                </Box>
            </Box>

            <Box sx={{ position: 'relative', flex: { xs: '0 0 112px', sm: '0 0 140px' } }}>
                <CardMedia
                    component="img"
                    image={albumCoverURL}
                    alt={`${albumName} album cover`}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = placeHolderImage;
                    }}
                />
            </Box>
        </Card>
    )
}

export { SongCard }
