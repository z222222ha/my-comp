import { useContext, useEffect, useState } from "react";
import { PlaygroundContext } from "../../../ReactPlayground/PlaygroundContext";
import Item from "./Item";
import Styles from "./index.module.scss";
import {
  ENTRY_FILE_NAME,
  APP_COMPONENT_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
} from "../../../ReactPlayground/file";

export default function FileList() {
  const {
    files,
    setSelectedFileName,
    selectedFileName,
    updateFileName,
    addFile,
    removeFile,
  } = useContext(PlaygroundContext);
  console.log(files, selectedFileName);
  const [tabs, setTabs] = useState([""]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, pre: string) => {
    updateFileName(pre, name);
    setSelectedFileName(name);
    console.log(files);

    setCreating(false);
  };

  const handleAdd = () => {
    const newFileName = "Comp" + Math.random().toString().slice(2, 6) + ".tsx";
    addFile(newFileName);
    setSelectedFileName(newFileName);

    setCreating(true);
  };

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  const ReadonlyFilesName = [
    ENTRY_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
  ];

  return (
    <div className={Styles.tabs}>
      <div className={Styles.wrapper}>
        {tabs.map((item, index, arr) => (
          // <div onClick={() => setSelectedFileName(item)}>{item}</div>
          <Item
            key={item + index}
            active={selectedFileName === item}
            creating={creating && index === arr.length - 1}
            readonly={ReadonlyFilesName.includes(item)}
            value={item}
            onClick={() => setSelectedFileName(item)}
            onEditComplete={(name) => handleEditComplete(name, item)}
            onRemove={() => handleRemove(item)}
          />
        ))}
        <div className={Styles.add} onClick={handleAdd}>
          +
        </div>
      </div>
    </div>
  );
}
