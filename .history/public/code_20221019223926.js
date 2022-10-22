(() => {
  let receiverId;

  const socket = io();

  const generateID = () => {
    return `${Math.trunc(Math.random() * 999)} - ${Math.trunc(
      Math.random() * 999
    )} - ${Math.trunc(Math.random() * 999)}`;
  };

  document
    .querySelector("#sender-start-con-btn")
    .addEventListener("click", () => {
      let joinId = generateID();

      document.querySelector("#join-id").innerHTML = `
    
    <b>Room ID:</b>
    <span>${joinId}</span>
    `;

      socket.emit("sender-join", {
        uid: joinId,
      });
    });

  socket.on("init", (uid) => {
    receiverId = uid;
    document.querySelector(".join-screen").classList.remove("active");

    document.querySelector(".fs-screen").classList.add("active");
  });

  document.querySelector("#file-input").addEventListener("change", (e) => {
    let file = e.target.files[0];

    if (!file) {
      return;
    }

    let reader = new FileReader();

    reader.onload = function (e) {
      let buffer = new Uint8Array(reader.result);

      let el = document.createElement("div");

      el.classList.add("item");

      el.innerHTML = `
       <div class="progress">0%</div>
       <div class="fileName">${file.name}</div>
      
      `;

      document.querySelector(".files-list").appendChild(el);

      shareFile(
        {
          fileName: file.name,
          total_buffer_size: buffer.length,
          buffer_size: 1024,
        },
        buffer,
        el.querySelector("progress")
      );
    };

    reader.readAsArrayBuffer(file);
  });

  function shareFile(metadata, buffer, progress_node) {
    socket.emit("file-meta", {
      uid: receiverId,
      metadata: metadata,
    });

    socket.on("fs-share", () => {
      let chunk = buffer.slice(0, metadata.buffer_size);

      buffer = buffer.slice(metadata.buffer_size, buffer.length);

      progress_node.innerHTML =
        Math.trunc(
          ((metadata.total_buffer_size - buffer.length) /
            metadata.total_buffer_size) *
            100
        ) + "%";

      if (chunk.length != 0) {
        socket.emit("file-raw", {
          uid: receiverId,
          buffer: chunk,
        });
      }
    });
  }
})();
