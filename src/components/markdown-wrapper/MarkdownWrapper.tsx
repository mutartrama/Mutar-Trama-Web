import Markdown, { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";

interface MarkdownWrapperProps {
  children?: string;
  components?: Components;
}

export const MarkdownWrapper = ({
  children,
  components,
}: MarkdownWrapperProps) => {
  return (
    <Markdown
      remarkPlugins={[remarkBreaks]}
      rehypePlugins={[rehypeRaw]}
      skipHtml={false}
      components={{
        p: ({ children }) => <>{children}</>,
        ...components,
      }}
    >
      {`${children}`}
    </Markdown>
  );
};
