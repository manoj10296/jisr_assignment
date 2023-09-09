import { useState, useCallback, memo } from "react";

import { ExplorerProps } from "../interface";

import fileIcon from "../assets/file.svg";
import down_arrow from "../assets/down_arrow.svg";
import right_arrow from "../assets/right_arrow.svg";
import folderIcon from "../assets/folder.svg";

import "./style.css";

const Explorer: React.FunctionComponent<ExplorerProps> = (props) => {
  const { explorer, handleLeftFileClick, handleRightMouseClick } = props;
  const [expand, setExpand] = useState(false);

  const handleFolderClick = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  if (explorer?.data?.length) {
    return (
      <div className="container">
        <div onClick={handleFolderClick} className="folder">
          {!expand ? (
            <img src={right_arrow} alt="ra" height={10} />
          ) : (
            <img src={down_arrow} alt="ra" height={10} />
          )}
          <img src={folderIcon} alt="folder" height={20} />
          <span>{explorer.name}</span>
        </div>

        <div
          className={`${expand ? "displayBlock" : "displayNone"} paddingLeft25`}
        >
          {explorer?.data.map((exp: any) => {
            return (
              <Explorer
                key={exp.name}
                explorer={exp}
                handleLeftFileClick={handleLeftFileClick}
                handleRightMouseClick={handleRightMouseClick}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <span
          className="file"
          onContextMenu={handleRightMouseClick}
          onClick={() => handleLeftFileClick(explorer.name)}
        >
          <img src={fileIcon} alt="file" height={20} />
          <span>{explorer.name}</span>
        </span>
      </>
    );
  }
};

export default memo(Explorer);
