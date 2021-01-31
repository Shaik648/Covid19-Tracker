import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
export default function InfoCard({ title, cases, total }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography color="textSecondary">{title}</Typography>
          <h2>{cases} </h2>
          <Typography color="textSecondary">{total}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}
