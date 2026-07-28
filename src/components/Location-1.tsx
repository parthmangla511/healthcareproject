function Locations(){
    return(
        <div style={{ marginTop: "20px" }}>
  <iframe
    title="Hospital Location"
    src="https://www.google.com/maps?q=New+Delhi&output=embed"
    width="100%"
    height="300"
    style={{ border: 0, borderRadius: "10px" }}
    loading="lazy"
    allowFullScreen
  ></iframe>
</div>
    );
}
export default Locations;