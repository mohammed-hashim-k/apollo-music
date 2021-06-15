import React from 'react';
import {
	TextField,
	InputAdornment,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	makeStyles
} from '@material-ui/core';
import { AddBoxOutlined, Link } from '@material-ui/icons';
import YoutubePlayer from 'react-player/lib/players/YouTube';
import SoundCloudPlayer from 'react-player/lib/players/SoundCloud';
import ReactPlayer from 'react-player';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'center'
	},
	urlInput: {
		margin: theme.spacing(1)
	},
	addSongButton: {
		margin: theme.spacing(1)
	},
	thumbnail: {
		width: '90%'
	}
}));

function Addsong() {
	const classes = useStyles();
	const [ url, setUrl ] = React.useState('');
	const [ playable, setPlayable ] = React.useState(false);

	const [ dialog, setDialog ] = React.useState(false);

	const [ song, setSong ] = React.useState({
		duration: 0,
		title: '',
		artist: '',
		thumbnail: ''
	});

	React.useEffect(
		() => {
			const isPlayable = SoundCloudPlayer.canPlay(url) || YoutubePlayer.canPlay(url);
			setPlayable(isPlayable);
		},
		[ url ]
	);
	function handleChangeSong(event) {
		const { name, value } = event.target;
		setSong((prevSong) => ({
			...prevSong,
			[name]: value
		}));
	}

	function handleCloseDialog() {
		setDialog(false);
	}
	async function handeEditSong({ player }) {
		const nestedPlayer = player.player.player;
		let songData;
		if (nestedPlayer.getVideoData) {
			songData = getYouTubeInfo(nestedPlayer);
		} else if (nestedPlayer.getCurrentSound) {
			songData = await getSoundcloudInfo(nestedPlayer);
		}
		setSong({ ...songData, url });
	}
	function getYouTubeInfo(player) {
		const duration = player.getDuration();
		const { title, video_id, author } = player.getVideoData();
		const thumbnail = 'http://img.youtube.com/vi/$<video_id>/0.jpg';
		return {
			duration,
			title,
			artist: author,
			thumbnail
		};
	}
	function getSoundcloudInfo(player) {
		return new Promise((resolve) => {
			player.getCurrentSound((songData) => {
				if (songData) {
					resolve({
						duration: Number(songData.duration / 1000),
						title: songData.title,
						artist: songData.user.username,
						thumbnail: songData.artwork_url.replace('-large', '-t500x500')
					});
				}
			});
		});
	}
	const { thumbnail, title, artist } = song;

	return (
		<div className={classes.container}>
			<Dialog className={classes.dialog} open={dialog} onClose={handleCloseDialog}>
				<DialogTitle>Edit Song</DialogTitle>
				<DialogContent>
					<img src={thumbnail} alt="Song thumbnail" className={classes.thumbnail} />
					<TextField
						onChange={handleChangeSong}
						value={title}
						margin="dense"
						name="title"
						label="Title"
						fullWidth
					/>
					<TextField
						onChange={handleChangeSong}
						value={artist}
						margin="dense"
						name="artist"
						label="Artist"
						fullWidth
					/>
					<TextField
						onChange={handleChangeSong}
						value={thumbnail}
						margin="dense"
						name="thumbnail"
						label="Thumbnail"
						fullWidth
					/>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleCloseDialog} color="secondary">
						cancel
					</Button>
					<Button variant="outlined" color="primary">
						Addsong
					</Button>
				</DialogActions>
			</Dialog>

			<TextField
				className={classes.urlInput}
				onChange={(event) => setUrl(event.target.value)}
				value={url}
				placeholder="Add Youtubeor Soundcloud url"
				fullWidth
				margin="normal"
				type="url"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Link />
						</InputAdornment>
					)
				}}
			/>

			<Button
				disabled={!playable}
				className={classes.addSongButton}
				onClick={() => setDialog(true)}
				variant="contained"
				color="primary"
				endIcon={<AddBoxOutlined />}
			>
				Add
			</Button>
			<ReactPlayer url={url} hidden onReady={handeEditSong} />
		</div>
	);
}
export default Addsong;
