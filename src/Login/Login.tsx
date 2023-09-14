import React, { useState } from "react";
import {
  IonIcon,
  IonButton,
  IonInput,
  IonList,
  IonItem,
  IonModal,
} from "@ionic/react";

import { Local } from "../storage/LocalStorage";
import { person } from "ionicons/icons";
import { Cloud } from "../storage/CloudStorage";
import { APP_NAME } from "../app-data.js";
import DropboxTransferButton from "../services/DropboxTransferButton";
import { DropboxService } from "../services/DropboxService";
const Login: React.FC = () => {
  const [login, setlLogin] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const cloud = new Cloud();

  const doAuth = () => {
    console.log("Loggin in... " + email);
    setlLogin(true);
    const data = { email: email, password: password, appname: APP_NAME };
    cloud._auth(data);
  };
  
  const handleTransferClick = async () => {
    // Retrieve all saved files from Local storage
    const localService = new Local();
    const fileNames = await localService._getAllFiles();

    // Initialize the Dropbox service
    const dropboxService = new DropboxService();

    // Loop through the file names and upload each file to Dropbox
    for (const fileName of Object.keys(fileNames)) {
      const file = await localService._getFile(fileName);
      await dropboxService.uploadFile(file);
      // Optionally, you can delete the file from Local storage after successful upload
      await localService._deleteFile(fileName);
    }

    // Inform the user that the transfer is complete
    console.log('All files transferred to Dropbox.');
  };

  <DropboxTransferButton onTransferClick={handleTransferClick} />

  const loginForm = () => {
    if (openLoginModal) {
      return (
        <IonModal
          isOpen={openLoginModal}
          animated
          onDidDismiss={() => setOpenLoginModal(false)}
        >
          <IonList>
            <IonItem>
              <IonInput
                required
                clearInput
                inputMode='email'
                pattern='email'
                id='email'
                value={email}
                onIonChange={(e) => setEmail(e.detail.value)}
                placeholder='Email..'
              />
            </IonItem>
            <IonItem>
              <IonInput
                required
                clearInput
                pattern='password'
                id='password'
                value={password}
                onIonChange={(e) => setPassword(e.detail.value)}
                placeholder='Password..'
              />
            </IonItem>
            <IonButton
              expand='full'
              className='ion-text-center'
              onClick={() => {
                doAuth();
                setOpenLoginModal(false);
              }}
            >
              Login
            </IonButton>
            <IonButton
              expand='block'
              color='secondary'
              onClick={() => {
                setOpenLoginModal(false);
              }}
            >
              Back
            </IonButton>
          </IonList>
        </IonModal>
      );
    } else return null;
  };

  return (
    <React.Fragment>
      <IonButton
        slot='start'
        className='ion-padding-start'
        onClick={() => {
          // auth(login);
          if (!login) setOpenLoginModal(true);
          else setlLogin(false);
        }}
      >
        <IonIcon icon={person} size='large' />
        {login ? "Logout" : "Login"}
      </IonButton>
      {loginForm()}
    </React.Fragment>
  );
};

export default Login;
