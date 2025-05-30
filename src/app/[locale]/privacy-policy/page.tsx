"use client";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { LegalsTitle } from "@/components/legals-title/legals-title";
import { MarkdownWrapper } from "@/components/markdown-wrapper/MarkdownWrapper";

interface LegalsData {
  title: string;
  content: string;
  label: string;
}

export default function Page() {
  const locale = useLocalePath();

  const [data, setData] = useState<LegalsData>();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          `/api/fetch-legals?lang=${locale}&key=privacy_policy`,
        );
        const { data } = await res.json();

        setData(data[0]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    getData();
  }, [locale]);

  return (
    <Box
      sx={{
        transition: "opacity 0.8s ease-in-out",
        pt: "70px",
        bgcolor: "primary.main",
        pb: 10,
        minHeight: "110vh",
      }}
    >
      <Header bgcolor="primary.main" fill="#DFDFDF" reachedEnd={false} />
      <LegalsTitle>{data?.title}</LegalsTitle>
      <Box
        sx={{
          px: 5,
          pl: { lg: "240px" },
          py: 10,
        }}
      >
        <MarkdownWrapper>
          {data?.content ? data.content : "Loading..."}
        </MarkdownWrapper>
      </Box>
    </Box>
  );
}
