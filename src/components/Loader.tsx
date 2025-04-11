import "./Loader.css";

type LoaderProps = {
  /** size in pixels, `48` by default */
  size?: number;
};

const Loader = (props: LoaderProps) => {
  const { size = 48 } = props;
  return <span className="loader" style={{ width: size, height: size }} />;
};

export default Loader;
