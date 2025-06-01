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
import { ProjectsTabItem } from "@/pages/api/responses";

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
          height: { xs: 580, lg: hovered ? "620px" : "450px" },
          transition: "height 0.5s ease-in-out",
        }}
      >
        {/* Imagen que se achica */}

        <Box
          component={motion.div}
          transition={{ duration: 0.5, ease: "linear" }}
          sx={{
            overflow: "hidden", // Muy importante
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: { xs: "100%", lg: hovered ? 100 : 300 },
          }}
        >
          <Box
            component="img"
            src="https://res.cloudinary.com/duwbaf7b1/image/upload/v1746928402/maxresdefault_vkbgbt.jpg"
            alt="gatito"
            sx={{
              aspectRatio: { lg: "1 / 1" },
              width: "100%" /* O cualquier ancho */,
              height: { xs: "300px" },
              overflow: "hidden",
              display: "block",
              objectFit: "cover",
              transition: "height 0.5s ease-in-out",
            }}
          />
        </Box>

        {/* Contenido visible siempre */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: 180,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 62, lg: 54, xl: 72 },
                lineHeight: 1,
              }}
            >
              {projectCardData.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ opacity: 0.5 }}
            >
              {projectCardData.subtitle}
            </Typography>
          </Box>

          {/* Contenido que aparece con hover */}
          <motion.div
            animate={{
              opacity: hovered ? 1 : 0,
              y: hovered ? 0 : 10,
              height: hovered ? "auto" : 0,
            }}
            transition={{ duration: 0.4 }}
            style={{
              overflow: "hidden",
            }}
          >
            <Typography variant="body1">{projectCardData.paragraph}</Typography>
          </motion.div>
        </Box>

        <Box sx={{ display: { lg: "none" } }}>
          <Link href={projectCardData.btnUrl}>
            <IconButton color="secondary">
              <Icon icon="diagonal-arrow" size={50} />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
