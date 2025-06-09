// "use client";
// import { Header } from "@/components/header/Header";
// import { useEffect, useState } from "react";
// import { Box } from "@mui/material";
// import { useLocalePath } from "@/hooks/useLocalePath";
// import { LegalsTitle } from "@/components/legals/legals-title";
// import { MarkdownWrapper } from "@/components/markdown-wrapper/MarkdownWrapper";

// interface LegalsData {
//   title: string;
//   content: string;
//   label: string;
// }

// export default function Page() {
//   const locale = useLocalePath();

//   const [data, setData] = useState<LegalsData>();

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await fetch(
//           `/api/fetch-legals?lang=${locale}&key=privacy_policy`,
//         );
//         const { data } = await res.json();

//         setData(data[0]);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };
//     getData();
//   }, [locale]);

//   return (
//     <Box
//       sx={{
//         transition: "opacity 0.8s ease-in-out",
//         pt: "70px",
//         bgcolor: "primary.main",
//         pb: 10,
//         minHeight: "110vh",
//       }}
//     >
//       <Header bgcolor="primary.main" fill="#DFDFDF" reachedEnd={false} />
//       <LegalsTitle>{data?.title}</LegalsTitle>
//       <Box
//         sx={{
//           px: 5,
//           pl: { lg: "240px" },
//           py: 10,
//           "& ol > li::marker, & ul > li::marker, & ul > li::first-line, & ol > li::first-line":
//             {
//               fontWeight: "bold",
//             },
//           "& ol": {
//             pl: 5,
//             display: "flex",
//             flexDirection: "column",
//             gap: 5,
//           },
//         }}
//       >
//         {data?.content ? (
//           <MarkdownWrapper>{data.content}</MarkdownWrapper>
//         ) : (
//           "Loading..."
//         )}
//       </Box>
//     </Box>
//   );
// }
"use client";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useLocalePath } from "@/hooks/useLocalePath";
import { MarkdownWrapper } from "@/components/markdown-wrapper/MarkdownWrapper";
import { MenuItemMobile } from "@/components/menu/MenuItemMobile";
import { LegalsDeco } from "@/components/legals/LegalsDeco";

interface LegalsData {
  title: string;
  content: string;
  label: string;
}

export default function Page() {
  const locale = useLocalePath();

  const [data, setData] = useState<LegalsData>();
  const [hasScrolled, setHasScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    // Llamamos una vez al cargar por si ya está scrolleado
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        transition: "opacity 0.8s ease-in-out",
        bgcolor: "primary.main",
        pb: 10,
        minHeight: "110vh",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          position: "fixed",
          width: 500,
          height: 500,
          top: 0,
          right: 0,
        }}
      >
        <LegalsDeco />
      </Box>
      <Header bgcolor="primary.main" fill="#DFDFDF" reachedEnd={false} />

      <MenuItemMobile
        index={1}
        reachedEnd={false}
        activeIndex={hasScrolled ? 1 : 0}
        href="#"
      >
        {data?.label ? data.label : <Skeleton width="100px" />}
      </MenuItemMobile>
      <Box
        sx={{
          pt: { xs: "90px" },
          px: 5,
          pl: { lg: "240px" },
          py: 10,
          "& ol > li::marker, & ul > li::marker, & ul > li::first-line, & ol > li::first-line":
            {
              fontWeight: "bold",
            },
          "& ol": {
            pl: 5,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: 56, lg: 96 },
            mb: { xs: 5, lg: 20 },
          }}
        >
          {data?.title ? (
            <MarkdownWrapper>{data?.title}</MarkdownWrapper>
          ) : (
            <>
              <Skeleton
                sx={{
                  width: { xs: 248, lg: 424 },
                }}
              />
              <Skeleton
                sx={{
                  width: { xs: 228, lg: 390 },
                }}
              />
            </>
          )}
        </Typography>
        {data?.content ? (
          <MarkdownWrapper>{data?.content}</MarkdownWrapper>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <Box key={i}>
                <Skeleton
                  sx={{
                    width: { xs: "100%" },
                  }}
                />
                <Skeleton
                  sx={{
                    width: { xs: "100%" },
                  }}
                />
                <Skeleton
                  sx={{
                    width: { xs: "100%" },
                  }}
                />
                <Skeleton
                  sx={{
                    width: { xs: "100%" },
                  }}
                />
                <Skeleton
                  sx={{
                    width: { xs: "80%" },
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
