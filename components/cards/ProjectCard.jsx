import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
//  PropTypes
import PropTypes from 'prop-types';
import { FilterItem } from "../utils/FilterItem";

const ProjectCard = (props) => {
    const { setChosenProject, proj } = props;

    return (
        <Card 
            sx={{  width: '100%',cursor: 'pointer' }}        
            onClick={() => setChosenProject(proj)}
            >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWduz08L8XnC7ISakSkmJCa5v9HPpVIFIjXuz1tLnaK8i3Q9dmEl1pUCyOW2UGZUvEC5g&usqp=CAU"
                />
            <CardContent>
                <Grid container sx={{ width: '100%'}}>
                    <Grid container md={6} sm={6} xs={6} p={1}>
                       <Typography variant="h5" component="div">
                            {proj.name.value}  
                        </Typography>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} p={1} justifyContent='end'> 
                        <Typography variant="md" component="div">
                            {FilterItem([{}],proj,'status.value')}
                        </Typography>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} p={1} >
                        <Typography variant="md">
                            Qtd: {proj.amount?.value}  
                        </Typography>
                    </Grid>
                    <Grid container md={6} sm={6} xs={6} p={1} justifyContent='end'> 
                        <Typography variant="md">
                            Feito: 0 / {proj.amount?.value}  
                        </Typography></Grid>
                </Grid>
               
                <Typography variant="body2" color="text.secondary">
                
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