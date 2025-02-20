import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Rishu from "./rishikesh.jpeg";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const AvatarDrawer = ({ popup, setPopup }) => {
  const handlePopup = () => {
    setPopup(!popup);
  };
  return (
    <>
      <Drawer
        open={popup}
        onClose={handlePopup}
        direction="right"
        className="bla bla bla"
        style={{ width: "20vw" }}
      >
        <div className="px-10 py-8">
          <h1 className="flex items-center gap-5">
            {" "}
            <Stack direction="row" spacing={2}>
              <Avatar alt="Remy Sharp" src={Rishu} />
            </Stack>
            <span className="font-[500]"> Rishikesh Kumar Singh</span>
          </h1>
        </div>
      </Drawer>
    </>
  );
};

export default AvatarDrawer;
