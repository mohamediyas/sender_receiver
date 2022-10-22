(() => {
  let senderId;

  const socket = io();

  const generateID = () => {
    return `${Math.trunc(Math.random() * 999)} - ${Math.trunc(
      Math.random() * 999
    )} - ${Math.trunc(Math.random() * 999)}`;
  };

  document
    .querySelector("#receiver-start-con-btn")
    .addEventListener("click", () => {
      senderId = document.querySelector("#join-id").value;

      if (senderId.length == 0) {
        return;
      }

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
    receiverId: uid;
    document.querySelector(".join-screen").classList.remove("active");

    document.querySelector(".fs-screen").classList.add("active");
  });
})();
