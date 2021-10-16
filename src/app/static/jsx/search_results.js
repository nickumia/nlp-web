import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Tooltip from '@mui/material/Tooltip';

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function SearchResults({results, prev_url, next_url}) {

	return (
    <React.Fragment>
      <Toolbar color="secondary" style={{
				float       : 'none', 
        width       : '200px',
        marginLeft  : 'auto',
        marginRight : 'auto'
			}}>
				<Tooltip title="Previous Results Page">
				  <IconButton color="inherit">
  			    <NavigateBeforeIcon />
    		  </IconButton>
				</Tooltip>
    	<Typography variant="p">
      	Navigate
      </Typography>
				<Tooltip title="Next Results Page">
				  <IconButton color="inherit">
  			    <NavigateNextIcon />
    	  	</IconButton>
				</Tooltip>
			</Toolbar>

			<List dense={false}>
				{results.map(results => (
        	<ListItemButton component='a' href={results.link} key={results.key}>
          	<ListItemText
            	primary={results.name}
              secondary={results.summary ? results.summary : 'Click for more info'}
              />
          </ListItemButton>
				))}
      </List>

    </React.Fragment>
	);
}
