import React from "react";
import Typography from "@material-ui/core/Typography";

import json_parse from './json_parse';


export default function PostDisplay({post}) {

  var post_dict = json_parse(post);

  return (
    <React.Fragment>
      <div className="wrapper row3">
        <main className="hoc container clear">
          <Typography variant="h3">
            {post_dict.title}
          </Typography>
          <Typography variant="h6">
            {post_dict.posted_time}
          </Typography>
          <hr/>
          <div className="content" dangerouslySetInnerHTML={{__html: post_dict.body}}></div>
          <hr/>
        </main>
      </div>

    </React.Fragment>
  );
}
