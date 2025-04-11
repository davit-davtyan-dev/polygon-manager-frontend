import Loader from "./Loader";
import "./LoadingOverlay.css";

type LoadingOverlayProps = React.HTMLAttributes<HTMLDivElement> & {
  loading?: boolean;
};

export default function LoadingOverlay({
  children,
  loading = true,
  ...rest
}: LoadingOverlayProps) {
  return (
    <div className="loading-container" {...rest}>
      <div className={loading ? "transparent-wrapper-view" : ""}>
        {children}
      </div>
      {loading && <Loader />}
    </div>
  );
}
