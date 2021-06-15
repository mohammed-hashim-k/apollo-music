import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Card, CardMedia, CardContent, Typography, IconButton, CardActions } from '@material-ui/core';
import { PlayArrow, Save } from '@material-ui/icons';
import { useQuery } from '@apollo/react-hooks';
import { GET_SONGS } from '../graphql/queries';
function SongList() {
	const { data, loading, error } = useQuery(GET_SONGS);
	// const song = {
	// 	title: 'call',
	// 	artist: 'hash',
	// 	thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/TEIDE.JPG/1024px-TEIDE.JPG'
	// };
	if (loading) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 50
				}}
			>
				<CircularProgress />
			</div>
		);
	}

	if (error) <div>error fetching songs</div>;

	return <div>{data.songs.map((song) => <Song key={song.id} song={song} />)}</div>;
}

const useStyles = makeStyles((theme) => ({
	container: {
		margin: theme.spacing(3)
	},
	songInfoContainer: {
		display: 'flex',
		alignItems: 'center'
	},
	songInfo: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	},
	thumbnail: {
		objectFit: 'cover',
		width: 140,
		height: 140
	}
}));

function Song({ song }) {
	const classes = useStyles();
	const { title, artist, thumbnail } = song;

	return (
		<Card className={classes.container}>
			<div className={classes.songInfoContainer}>
				<CardMedia image={thumbnail} className={classes.thumbnail} />
				<div className={classes.songInfo}>
					<CardContent>
						<Typography gutterBottom="h5" component="h2">
							{title}
						</Typography>
						<Typography variant="body1" component="p" color="textSecondary">
							{artist}
						</Typography>
					</CardContent>
					<CardActions>
						<IconButton size="small" color="primary">
							<PlayArrow />
						</IconButton>
						<IconButton size="small" color="secondary">
							<Save />
						</IconButton>
					</CardActions>
				</div>
			</div>
		</Card>
	);
}

export default SongList;
