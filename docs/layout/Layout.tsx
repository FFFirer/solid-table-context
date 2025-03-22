import { A } from "@solidjs/router";
import { ParentProps } from "solid-js";

export default (props: ParentProps) => {
  return (
    <>
      <div class="navbar">
        <A href="/" class="btn btn-link">Hello</A>
        <A href="/empty" class="btn btn-link">Empty</A>
      </div>
      {props.children}
    </>
  );
};
