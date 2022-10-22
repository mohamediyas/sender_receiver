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

      socket.emit("receiver-join", {
        uid: joinId,
        sender_uid: senderId,
      });
    });

  document.querySelector(".join-screen").classList.remove("active");

  document.querySelector(".fs-screen1").classList.add("active");
})();
