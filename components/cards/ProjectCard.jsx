import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
//  PropTypes
import PropTypes from 'prop-types';

const ProjectCard = (props) => {
    const { setChosenProject, proj } = props;

    return (
        <Card 
            sx={{ maxWidth: 345, cursor: 'pointer' }}        
            onClick={() => setChosenProject(proj)}
            >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWduz08L8XnC7ISakSkmJCa5v9HPpVIFIjXuz1tLnaK8i3Q9dmEl1pUCyOW2UGZUvEC5g&usqp=CAU"
                />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {proj.name.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small" onClick={() => {
                    setChosenProject(rowIndex + 1);
                    console.log(rowIndex);
                    }}>Escolher</Button>
                <Button size="small">Finalizar Produção</Button>
            </CardActions> */}
            </Card>
    );
};
 
ProjectCard.propTypes = {
    proj: PropTypes.object.isRequired,
    setChosenProject: PropTypes.func.isRequired,
};

export default ProjectCard;