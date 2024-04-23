import EditorHeader from "@/components/EditorHeader";
import EditorLayout from "@/components/EditorLayout";
import { Fragment, useState } from "react";

export default function Pen() {
  return (
    <Fragment>
      <EditorHeader></EditorHeader>
      <EditorLayout></EditorLayout>
    </Fragment>
  );
}
