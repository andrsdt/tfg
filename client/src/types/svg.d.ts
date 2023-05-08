// Allows to import like ?url https://react-svgr.com/docs/next/
declare module '*.svg?url' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
