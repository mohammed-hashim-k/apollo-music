import React from 'react';
import {
	makeStyles,
	Avatar,
	Card,
	Slider,
	CardMedia,
	CardContent,
	Typography,
	IconButton,
	CardActions,
	useMediaQuery
} from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Delete } from '@material-ui/icons';

function QueuedSongList() {
	const greaterThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'));
	const song = {
		title: 'call',
		artist: 'hash',
		thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/TEIDE.JPG/1024px-TEIDE.JPG'
	};

	return (
		greaterThanMd && (
			<div style={{ margin: '10px 0' }}>
				<Typography color="textSecondary" variant="button">
					QUEUE (5)
				</Typography>
				{Array.from({ length: 5 }, () => song).map((song, i) => <QueuedSong key={i} song={song} />)}
			</div>
		)
	);
}
const useStyles = makeStyles({
	avatar: {
		width: 44,
		height: 44
	},
	text: {
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},
	container: {
		display: 'grid',
		gridAutoFlow: 'column',
		gridTemplateColumns: '50px auto 50px',
		gridGap: 100,
		alignItems: 'center',
		marginTop: 20
	},
	songInfoContainer: {
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	}
});

function QueuedSong({ song }) {
	const classes = useStyles();
	const { thumbnail, artist, title } = song;
	return (
		<div className={classes.container}>
			<Avatar className={classes.avatar} src={thumbnail} alt="song thumbnail" />
			<div className={classes.songInfoContainer}>
				<Typography className={classes.text} variant="subtitle2">
					{title}
				</Typography>

				<Typography className={classes.text} variant="body2" color="textSecondary">
					{artist}
				</Typography>
				<IconButton>
					<Delete color="error" />
				</IconButton>
			</div>
		</div>
	);
}

export default QueuedSongList;
