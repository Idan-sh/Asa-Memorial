interface LoaderProps {
  size?: string;
}
export default function Loader({ size = '40px' }: LoaderProps) {
  return <span className="loader" style={{ width: size, height: size }}></span>;
}
