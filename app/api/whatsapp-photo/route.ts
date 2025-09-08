import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  // JSON padrão de retorno em caso de falha da API externa
  const fallbackPayload = {
    success: true,
    result:
      "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
    is_photo_private: true,
  }

  try {
    const { phone } = await request.json()

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Le numéro de téléphone est requis" },
        {
          status: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
        },
      )
    }

    // Apenas remove caracteres não numéricos. O número já vem com o código do país do frontend.
    const fullNumber = phone.replace(/[^0-9]/g, "")

    const response = await fetch(
      `https://primary-production-aac6.up.railway.app/webhook/request_photo?tel=${fullNumber}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Origin: "https://whatspy.chat", // Importante: A API externa pode validar esta origem
        },
        // timeout de 10 segundos
        signal: AbortSignal.timeout?.(10_000),
      },
    )

    // Se a API externa falhar, retornamos o payload padrão com status 200
    if (!response.ok) {
      console.error("API externa retornou status:", response.status)
      return NextResponse.json(fallbackPayload, {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      })
    }

    const data = await response.json()

    // Verifica se a foto é privada ou inexistente
    const isPhotoPrivate = !data?.link || data.link.includes("no-user-image-icon")

    return NextResponse.json(
      {
        success: true,
        result: isPhotoPrivate ? fallbackPayload.result : data.link,
        is_photo_private: isPhotoPrivate,
      },
      {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
      },
    )
  } catch (err) {
    console.error("Erro no webhook WhatsApp:", err)
    // Em caso de qualquer erro, retornamos o payload padrão para não quebrar o frontend
    return NextResponse.json(fallbackPayload, {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    })
  }
}

// A função OPTIONS está correta para lidar com requisições pre-flight de CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
