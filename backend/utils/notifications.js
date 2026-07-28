const notificationClients = new Set();

const addNotificationClient = (res) => {
  notificationClients.add(res);
};

const removeNotificationClient = (res) => {
  notificationClients.delete(res);
};

const broadcastNotification = (payload) => {
  const message = JSON.stringify(payload);
  for (const client of notificationClients) {
    if (!client.writableEnded) {
      client.write(`event: notification\ndata: ${message}\n\n`);
    }
  }
};

module.exports = {
  addNotificationClient,
  removeNotificationClient,
  broadcastNotification,
};
