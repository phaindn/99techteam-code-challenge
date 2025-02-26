import React from "react";

export type DropdownProps = React.PropsWithChildren<{
  className?: string;
  classController?: string;
  classDropdown?: string;
  controller: React.ReactElement;
  attributes?: object;
}>
