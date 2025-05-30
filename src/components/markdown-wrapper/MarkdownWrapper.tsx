import Markdown, { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { Box } from "@mui/material";

interface MarkdownWrapperProps {
  children: string;
  components?: Components;
}

export const MarkdownWrapper = ({
  children,
  components,
}: MarkdownWrapperProps) => {
  return (
    <Box
      sx={{
        "& ol, & ul": {
          paddingLeft: "1rem",
        },
        "& ol > li::marker, & ul > li::marker": {
          fontWeight: "bold",
        },
      }}
    >
      <Markdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
        components={components}
      >
        {children}
      </Markdown>
    </Box>
  );
};

// const { lastPinnedIndex, backgroundColor } = useGlobalNavigationLayout();

// const isPinned = useMemo(
//   () => indexPosition < lastPinnedIndex,
//   [indexPosition, lastPinnedIndex],
// );
// const isAtBottom = useMemo(() => lastPinnedIndex === 4, [lastPinnedIndex]);

// // console.log(isPinned, isAtBottom)
// const bgColor =
//   indexPosition < lastPinnedIndex && backgroundColor
//     ? backgroundColor
//     : defaultBackgroundColor;
// const fgColor = bgColor === "#DFDFDF" ? "#1F1F1F" : "#DFDFDF";
