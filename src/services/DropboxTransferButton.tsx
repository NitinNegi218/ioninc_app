// src/components/DropboxTransferButton.tsx

import React from 'react';
import { IonButton } from '@ionic/react';

interface DropboxTransferButtonProps {
  onTransferClick: () => void;
}

const DropboxTransferButton: React.FC<DropboxTransferButtonProps> = ({ onTransferClick }) => {
  return (
    <IonButton onClick={onTransferClick}>Transfer to Dropbox</IonButton>
  );
};

export default DropboxTransferButton;