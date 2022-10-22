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
})();
