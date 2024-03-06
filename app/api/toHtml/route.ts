const systemPrompt = `You are an expert tailwind developer. A user will provide you with a
 low-fidelity wireframe of an application and you will return 
 a single html file that uses tailwind to create the website. Use creative license to make the application more fleshed out.
if you need to insert an image, use placehold.co to create a placeholder image. Respond only with the html file.`;

export async function POST(request: Request) {
  const { image } = await request.json();  // Assume 'image' contains the necessary image data
  const body: any = {
    model_name: "gemini-pro-vision",  // Specify the Gemini Pro Vision model
    prompts: [
      {
        type: "text",  // Type for text prompts
        content: "What is in this photo?"  // The text part of the prompt
      },
      {
        type: "image",  // Type for image prompts
        content: image  // The image part of the prompt
      }
    ]
  };

  let json = null;
  try {
    const resp = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCUdA1sEGi_mQdHZ2MA9QcyMZSZGci1z2Y", {  // URL updated for the Gemini API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    json = await resp.json();
    console.log('json', json);
  } catch (e) {
    console.log(e);
  }

  return new Response(JSON.stringify(json), {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
  });
}

