export const bookAmbulance = async (data: any) => {
  const response = await fetch("http://localhost:5000/api/ambulance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};