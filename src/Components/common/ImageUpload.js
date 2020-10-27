import { Button, TextField } from "@material-ui/core";
import React, { useState, Component } from "react";
import firebase from "../../config/fbConfig";

const storage = firebase.storage();

function ImageUpload({ image }) {
  const [state, setState] = useState({
    image: image,
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
          .then((ImageLink) => {
            console.log("++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(ImageLink);
            setState({ ImageLink });
          });
      }
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <input
        name={state.image}
        type="file"
        onChange={handleChange}
        style={{ marginTop: 10, paddingRight: 20 }}
      />
      <button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginTop: 10, paddingRight: 20 }}
        onClick={handleUpload}
      >
        upload image
      </button>
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
