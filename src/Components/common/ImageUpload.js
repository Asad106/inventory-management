import { Button, Input, TextField } from "@material-ui/core";
import React, { useState, Component } from "react";
import firebase from "../../config/fbConfig";

const storage = firebase.storage();

function ImageUpload({ imageHandler }) {
  const [state, setState] = useState({
    image: "",
    imageLink: "",
    progress: 0,
  });

  function handleChange(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      setState(() => ({ image }));
      console.log(image);
    }
  }
  function handleUpload() {
    const { image } = state;
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setState({ progress });
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((imageLink) => {
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(imageLink);
            setState({ ...state, imageLink });
            imageHandler(imageLink);
          });
      }
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <input
        name={state.image}
        type="file"
        onChange={handleChange}
        // style={{ marginTop: 10, paddingRight: 5 }}
      />
      <Button
        variant="contained"
        color="default"
        size="small"
        style={{ marginTop: 10, paddingRight: 5 }}
        onClick={handleUpload}
      >
        upload image
      </Button>
      {/* <progress
          value={this.state.progress}
          max="100"
          style={{ marginTop: 10 }}
        />

        <img
          src={this.state.url}
          alt="Uploaded images"
          height="100"
          width="100"
        /> */}
    </div>
  );
}

export default ImageUpload;
