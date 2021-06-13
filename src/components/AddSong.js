import React from 'react';
import { TextField,InputAdornment,Button,Dialog,DialogTitle,DialogContent,DialogActions,makeStyles } from "@material-ui/core";
import { AddBoxOutlined,Link} from '@material-ui/icons';



const useStyles=makeStyles(theme =>({
    container:{
        display: 'flex',
        alignItems:'center',

    },
    urlInput: {
        margin: theme.spacing(1)

    },
    addSongButton:{
        margin: theme.spacing(1)

    },
    thumbnail:{
        width:'90%'
    }
}))





function Addsong(){
    const classes=useStyles()

    const [dialog,setDialog]=React.useState(false);

    function handleCloseDialog(){
        setDialog(false);
    }
    return (
    <div className={classes.container}>
        <Dialog
        className={classes.dialog}

        open={dialog}
        onClose={handleCloseDialog}
        >
            <DialogTitle>Edit Song</DialogTitle>
            <DialogContent>
                <img src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Song thumbnail"
                className={classes.thumbnail}
                />
                <TextField

                margin="dense"
                name="title"
                label="Title"
                fullWidth


                />
                <TextField

                margin="dense"
                name="artist"
                label="Artist"
                fullWidth


                />
                <TextField

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




        <TextField className={classes.urlInput}
        placeholder="Add Youtubeor Soundcloud url"
        fullWidth
        margin="normal"
        type="url"
        InputProps={
            {
                startAdornment: (
                    <InputAdornment position="start"> 
                    <Link/>
                    </InputAdornment>
                )
            }
        }

        
        
        />

        <Button 
        className={classes.addSongButton}
        onClick={() =>setDialog(true)}
            variant="contained"
            color="primary"
            endIcon={<AddBoxOutlined/>}


        >
            Add


        </Button>

    
    </div>
    );

}
export default Addsong;