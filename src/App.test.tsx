import App from "./App";
import shallowRenderer from "react-test-renderer/shallow";

it("renders without crashing", () => {
  const view = shallowRenderer.createRenderer();
  view.render(<App />);
  const utils = view.getRenderOutput();
  expect(utils).toMatchSnapshot();
});
