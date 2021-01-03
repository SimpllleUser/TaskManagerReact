import React from "react";
import { Pane, Text, Badge, Pill, Heading } from "evergreen-ui";

const EmptContent = ({ object_name }) => (
  <Pane
    elevation={3}
    width={600}
    height={120}
    marginTop={200}
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
  >
    <Text>
      Sorry {object_name} empty<Badge color="red">:(</Badge>
    </Text>
    <Text size={600}>
      Plese, create {object_name}
      <Pill color="green">:)</Pill>
    </Text>
  </Pane>
);

export default EmptContent