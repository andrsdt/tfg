// Given a string with \n, return a react component with <br/> tags
// This is useful for splitting words manually in a some views
export const formatWordBreaks = (text: string) => {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};
