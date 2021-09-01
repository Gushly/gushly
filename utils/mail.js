
export const sendMail = async (data = {}) => {
  console.log("test")
  try {
    await fetch("/api/notify", {
      "method": "POST",
      "headers": { "content-type": "application/json" },
      "body": JSON.stringify(data)
    })
  } catch (error) {
    console.log(error)
    // toast error message. whatever you wish 
  }

}