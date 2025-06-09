// import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
// import Image from "next/image";
// import { Link } from "@/i18n/routing";
// import Icon from "../icon/Icon";
// import { ProjectsItemProps } from "./projects.types";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";

// export const ProjectCard = (projectCardData: ProjectsItemProps) => {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <Card
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       elevation={0}
//       sx={{
//         bgcolor: "transparent",
//         display: "flex",
//         flexDirection: "column",
//         gap: 5,
//         borderRadius: 0,
//         border: "none",
//         pb: 5,
//         px: 5,
//         color: "text.secondary",
//         maxWidth: { lg: 324, xl: 464 },
//       }}
//     >
//       <CardMedia
//         sx={{
//           position: "relative",
//           width: "100%",
//           "&:before": { content: '""', display: "block", pt: "100%" },
//         }}
//       >
//         <Image
//           src={projectCardData.image}
//           alt={projectCardData.title}
//           fill
//         ></Image>
//       </CardMedia>
//       <Typography
//         variant="h2"
//         sx={{
//           fontSize: { xs: 62, lg: 54, xl: 72 },
//           lineHeight: 1,
//         }}
//       >
//         {projectCardData.title}
//       </Typography>
//       <Typography sx={{ opacity: 0.5 }}>{projectCardData.subtitle}</Typography>
//       <MotionBox layout transition={{ duration: 0.5, ease: "easeInOut" }}>
//         <AnimatePresence>
//           {hovered && (
//             <MotionBox
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 10 }}
//               transition={{ duration: 0.4, delay: 0.1 }}
//               sx={{ mt: 2 }}
//             >
//               <Typography variant="body1">
//                 {projectCardData.paragraph}
//               </Typography>
//             </MotionBox>
//           )}
//         </AnimatePresence>

//         <Box sx={{ display: { lg: "none" } }}>
//           <Link href={projectCardData.btnUrl}>
//             <IconButton color="secondary">
//               <Icon icon="diagonal-arrow" size={50} />
//             </IconButton>
//           </Link>
//         </Box>
//       </MotionBox>
//     </Card>
//   );
// };

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "@/i18n/routing";
import Icon from "../icon/Icon";
import { ProjectsTabItem } from "@/app/api/responses";
import { MarkdownWrapper } from "../markdown-wrapper/MarkdownWrapper";

export const ProjectCard = (projectCardData: ProjectsTabItem) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
        px: 4,
        color: "text.secondary",
      }}
    >
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          height: { xs: 580, lg: hovered ? "75vh" : "450px" },
          transition: "height 0.5s ease-in-out",
        }}
      >
        {/* Imagen que se achica */}

        <Box
          component={motion.div}
          transition={{ duration: 0.5, ease: "linear" }}
          animate={{ height: hovered ? 100 : 300 }}
          sx={{
            overflow: "hidden", // Muy importante
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/duwbaf7b1/image/upload/v1746928402/maxresdefault_vkbgbt.jpg"
            alt="gatito"
            sx={{
              width: "100%" /* O cualquier ancho */,
              height: { xs: "300px", lg: "auto" },
              overflow: "hidden",
              display: "block",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Contenido visible siempre */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: { xs: 180, lg: "auto" },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 56, lg: 54, xl: 72 },
                lineHeight: 1,
              }}
            >
              <MarkdownWrapper>{projectCardData.title}</MarkdownWrapper>
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ opacity: 0.5 }}
            >
              <MarkdownWrapper>{projectCardData.subtitle}</MarkdownWrapper>
            </Typography>
          </Box>

          {/* Contenido que aparece con hover */}
          <Box
            component={motion.div}
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 10,
              height: hovered ? "auto" : 0,
            }}
            transition={{ duration: 0.4, ease: "linear" }}
            sx={{
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <Typography variant="body1">
              <MarkdownWrapper>{projectCardData.paragraph}</MarkdownWrapper>
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 5,
              }}
            >
              {projectCardData.tags.map((tag) => (
                <Typography key={tag} component="span">
                  <MarkdownWrapper>{tag}</MarkdownWrapper>
                </Typography>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              pb: 4,
            }}
          >
            <Link href={projectCardData.btnUrl}>
              <IconButton color="secondary">
                <Icon icon="diagonal-arrow" size={50} />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
