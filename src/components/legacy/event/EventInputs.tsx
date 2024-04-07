import React, { useEffect, type MouseEventHandler } from "react";
import { CornerDownLeft } from "lucide-react";

import ColorPicker from "../popups/ColorPicker";
import LabelChip from "./LabelChip";

type Props = {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  color: string;
  setColor: (color: string) => void;
  labels: string[];
  setLabels: (labels: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submit: (e: any) => void;
};

function CreateEventModule({
  title,
  setTitle,
  description,
  setDescription,
  color,
  setColor,
  labels,
  setLabels,
  submit,
}: Props) {
  const maxLabels = 7;
  const labelsInput = React.createRef<HTMLInputElement>();
  const titleInput = React.createRef<HTMLInputElement>();

  useEffect(() => {
    titleInput.current?.focus();

    // TODO autocomplete, also replace the `MyInterface` interface with the interface you want to use with autocomplete
    // if (labelsInput.current) {
    //     autocomplete({
    //         input: labelsInput.current,
    //         emptyMsg: "No items found",
    //         minLength: 1,
    //         fetch: (text: string, update: (items) => void) => {
    //             // Create the suggestions list using the text in the input
    //             // text = text.toLowerCase();
    //             // you can also use AJAX requests instead of preloaded data
    //             // var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
    //             // update(suggestions);

    //         },
    //         onSelect: (item) => {
    //             // Do something with the selected item
    //                 labelsInput.current.value = item.label as string;
    //         }
    //     });
    // }
  }, []);

  function pickColor(color: string): void {
    setColor(color);
  }

  function removeLabel(label: string): void {
    setLabels(labels.filter((clickedLabel) => clickedLabel !== label));
  }

  // runs on key up
  function checkKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      // TODO show snackbar if max labels reached
      if (labels.length === maxLabels) return;
      addLabel(e);
    } else if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      labels.length > 0
    ) {
      setLabels(labels.slice(0, labels.length - 1));
    }
  }

  function addLabel(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key !== "Enter") return;
    const label = e.currentTarget.value;
    if (label === "") return;
    setLabels([...labels, label]);
    e.currentTarget.value = "";
  }

  return (
    <div className="container mx-auto flex select-none flex-row gap-2 rounded-lg px-2 py-2 shadow-md outline outline-2 outline-neutral-700 transition-colors duration-300 hover:shadow-lg">
      <div className="h-auto w-12 flex-shrink-0 flex-grow-0">
        <ColorPicker
          className="mx-auto my-auto h-full w-full scale-x-[-1] rounded-md duration-150 hover:bg-red-700"
          pickColor={pickColor}
          selectedColor={color}
        />
      </div>

      <div className="fields flex h-full w-full flex-shrink flex-grow flex-col gap-2 divide-y-2 divide-neutral-700">
        <input
          className="bg-transparent px-2 py-2 text-2xl outline-none"
          autoCorrect="on"
          spellCheck="true"
          type="text"
          ref={titleInput}
          placeholder="Task Name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea
          className="min-h-max flex-auto flex-shrink flex-grow resize-none overflow-visible bg-transparent px-2 py-2 text-lg outline-none"
          rows={2}
          id="description-field"
          autoCorrect="on"
          spellCheck="true"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <div className="labels flex h-full w-full flex-shrink flex-grow flex-row flex-wrap gap-2 pt-2">
          {labels.map((label) => (
            <LabelChip
              key={label}
              onClickRemove={(label) => removeLabel(label)}>
              {label}
            </LabelChip>
          ))}
          <input
            className="w-full bg-transparent px-2 py-2 text-lg outline-none"
            autoCorrect="on"
            spellCheck="true"
            type="text"
            id="labels-field"
            placeholder="Labels"
            onKeyUp={(e) => checkKeyPress(e)}
            ref={labelsInput}
          />
        </div>
      </div>

      <div className="submit h-auto w-12 flex-shrink-0 flex-grow-0">
        <button
          className="mx-auto my-auto flex h-full w-full flex-none scale-x-[-1] items-center justify-center rounded-md bg-red-500 text-3xl text-white duration-150 hover:bg-red-700 hover:text-neutral-200"
          type="button"
          onClick={submit}>
          {<CornerDownLeft />}
        </button>
      </div>
    </div>
  );
}

export default CreateEventModule;
