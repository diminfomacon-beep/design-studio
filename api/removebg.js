export default async function handler(req,res){

  const {image}=req.body;

  const response=await fetch("https://api.remove.bg/v1.0/removebg",{
    method:"POST",
    headers:{
      "X-Api-Key":process.env.REMOVE_BG_KEY,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      image_file_b64:image.split(",")[1],
      size:"auto"
    })
  });

  const buffer=await response.arrayBuffer();
  const base64=Buffer.from(buffer).toString("base64");

  res.status(200).json({
    url:`data:image/png;base64,${base64}`
  });
}
