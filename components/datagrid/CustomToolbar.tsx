import React, { MouseEventHandler } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DownloadOutlinedIcon from "@mui/icons-material/CloudDownload";
import Link from "next/link";

type CustomToolbarProps = {
  downloadCsvTitle: string
  newItemTitle: string
  newUrl: string
  newAction: MouseEventHandler
  exportCsv: MouseEventHandler
}

class CustomToolbar extends React.Component<CustomToolbarProps> {
  
   render() {
    return (
      <React.Fragment>
        <Tooltip title={this.props.downloadCsvTitle}>
          <IconButton onClick={this.props.exportCsv}>
            <DownloadOutlinedIcon/>
          </IconButton>
        </Tooltip>
        { this.props.newAction ? 
          <IconButton onClick={this.props.newAction}>
            <AddIcon/>
          </IconButton>
        : this.props.newUrl ?
        <Link href={this.props.newUrl + (this.props.newUrl.indexOf('?')<0 ? '/novo' : '')}>
          <Tooltip title={this.props.newItemTitle}>
            <IconButton>
              <AddIcon/>
            </IconButton>
          </Tooltip>
        </Link> : ''}
      </React.Fragment>
    );
  }

}

export default CustomToolbar;
