import { NextResponse } from "next/server"
import OpenAI from "openai"
import { AxiosResponse } from "axios"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request, response: any) {
  try {
    const { title, role } = await request.json()

    const chatCompletion: AxiosResponse<any, any> =
      await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "user",
            // content: `Create small blog post with html tags based on this title: ${title}`,
            content: `Create 3 line blog post with html tags based on this title: ${title}`,
          },
          {
            role: "system",
            content: `${
              role || "I am a helpful assistant"
            }. Write with html tags.`,
          },
        ],
      })

    // console.log(chatCompletion.choices)

    // response.revalidate("/api/posts")
    return NextResponse.json(
      {
        content: chatCompletion.data.choices[0].message?.content,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("request error", error)
    NextResponse.json({ error: "error updating post" }, { status: 500 })
  }
}

//  const aiResponse: AxiosResponse<CreateChatCompletionResponse, any> =
//    await openai.createChatCompletion({
//      model: "gpt-3.5-turbo",
//      messages: [
//        {
//          role: "user",
//          // content: `Create small blog post with html tags based on this title: ${title}`,
//          content: `Create 3 line blog post with html tags based on this title: ${title}`,
//        },
//        {
//          role: "system",
//          content: `${
//            role || "I am a helpful assistant"
//          }. Write with html tags.`,
//        },
//      ],
//    })
