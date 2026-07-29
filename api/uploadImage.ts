import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const apiKey = process.env.IMGBB_API_KEY;
    
    if (!apiKey) {
      console.error("IMGBB_API_KEY is missing in Environment Variables");
      return res.status(500).json({ error: 'Server misconfiguration: Missing CDN API Key' });
    }

    // Prepare FormData for ImgBB
    // The ImgBB API expects the base64 string WITHOUT the data URI prefix
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');

    const formData = new URLSearchParams();
    formData.append('image', base64Data);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'ImgBB Upload Failed');
    }

    // data.data.url contains the direct image link
    return res.status(200).json({ 
      success: true, 
      imageUrl: data.data.url 
    });

  } catch (error: any) {
    console.error("Upload Image Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
}
