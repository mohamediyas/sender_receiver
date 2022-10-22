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
    };

    reader.readAsArrayBuffer(file);
  });
})();
