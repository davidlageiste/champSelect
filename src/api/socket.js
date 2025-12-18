export function subscribeToChampSelect(callback) {
  const socket = new WebSocket("ws://localhost:3001");

  socket.onopen = () => console.log("WebSocket frontend connecté !");
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      callback(data);
    } catch (err) {
      console.error("Erreur parsing JSON :", err);
    }
  };
  socket.onerror = (err) => console.error("WebSocket error:", err);
  socket.onclose = () => console.log("WebSocket fermé.");
}
