const generateTrackingId = () => {
    const year = new Date().getFullYear();
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
  
    return `CMS${year}${randomNumber}`;
  };
  
  export default generateTrackingId;