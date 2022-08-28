import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  box-shadow: 24px;
  background: white;
  border: none;
`;

const StyledModal = (props) => {
  const { onClose, selectedData } = props;

  return (
    <Modal open={true} onClose={onClose}>
      <StyledBox>Hi</StyledBox>
    </Modal>
  );
};

export default StyledModal;
