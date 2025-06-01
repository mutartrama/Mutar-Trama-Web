import Markdown, { Components } from "react-markdown";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { Box } from "@mui/material";

interface MarkdownWrapperProps {
  children?: string;
  components?: Components;
}

export const MarkdownWrapper = ({
  children,
  components,
}: MarkdownWrapperProps) => {
  return (
    <Box
      sx={{
        "& h2": {
          fontSize: { xs: 42, lg: 54, xl: 72 },
          fontFamily: "var(--font-viaoda-libre)",
          margin: 0,
        },
        "& ol, & ul": {
          paddingLeft: "1rem",
        },
        "& ol > li::marker, & ul > li::marker": {
          fontWeight: "bold",
        },
        "& p": {
          margin: 0,
        },
      }}
    >
      <Markdown
        remarkPlugins={[remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
        components={components}
      >
        {`${children}`.replaceAll("<br/>", "\n").replaceAll("<br />", "\n")}
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
