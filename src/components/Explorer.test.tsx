import ReactDOM from "react-dom";
import { inputData } from "../inputData";
import { FileExplorer } from "../interface";
import Explorer from "./Explorer";

describe("Explorer Component", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("should toggle expand state when folder is clicked", () => {
    const mockExplorer: FileExplorer = inputData;

    const mockHandleLeftFileClick = jest.fn();
    const mockHandleRightMouseClick = jest.fn();

    ReactDOM.render(
      <Explorer
        explorer={mockExplorer}
        handleLeftFileClick={mockHandleLeftFileClick}
        handleRightMouseClick={mockHandleRightMouseClick}
      />,
      container
    );

    const folderElement = container.querySelector(".folder");
    expect(folderElement).toBeTruthy();

    const arrowIcon = folderElement?.querySelector('img[alt="ra"]');
    expect(arrowIcon).toBeTruthy();

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
    });

    folderElement?.dispatchEvent(clickEvent);

    // Check if expand state has toggled
    const updatedArrowIcon = folderElement?.querySelector('img[alt="ra"]');
    expect(updatedArrowIcon?.getAttribute("src")).toContain("down_arrow.svg");
  });

  it("should call handleLeftFileClick when a file is clicked", () => {
    const mockExplorer = inputData;

    const mockHandleLeftFileClick = jest.fn();
    const mockHandleRightMouseClick = jest.fn();

    ReactDOM.render(
      <Explorer
        explorer={mockExplorer}
        handleLeftFileClick={mockHandleLeftFileClick}
        handleRightMouseClick={mockHandleRightMouseClick}
      />,
      container
    );

    const fileElement = container.querySelector(".file");
    expect(fileElement).toBeTruthy();

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
    });

    fileElement?.dispatchEvent(clickEvent);

    // Check if handleLeftFileClick has been called
    expect(mockHandleLeftFileClick).toHaveBeenCalledWith("Test File");
  });

  it("should call handleRightMouseClick when right-clicked", () => {
    const mockExplorer = inputData;

    const mockHandleLeftFileClick = jest.fn();
    const mockHandleRightMouseClick = jest.fn();

    ReactDOM.render(
      <Explorer
        explorer={mockExplorer}
        handleLeftFileClick={mockHandleLeftFileClick}
        handleRightMouseClick={mockHandleRightMouseClick}
      />,
      container
    );

    const folderElement = container.querySelector(".folder");
    expect(folderElement).toBeTruthy();

    const contextMenuEvent = new MouseEvent("contextmenu");
    folderElement?.dispatchEvent(contextMenuEvent);

    const clickEvent = new MouseEvent("click", {
      bubbles: true,
    });

    folderElement?.dispatchEvent(clickEvent);

    // Check if handleRightMouseClick has been called
    expect(mockHandleRightMouseClick).toHaveBeenCalled();
  });
});
