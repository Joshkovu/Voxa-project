export async function GET() {
    return Response.json({success:true,data:'THANK YOU!'},{status:200})
}
export async function POST (request:Request){
    const {problem,amount}=await request.json()
    try {
        const { text:questions } = await generateText({
            model: google('gemini-2.0-flash-001'),
            prompt: `Prepare to solve user's tax problem 
                 the questions should solve a tax ${problem}
                 the amount of questions required is :${amount}

            `
       }) 
    } catch (error) {
        console.error(error)
       return Response.json({success:false,error},{status:500}) 
    }


}

function generateText(arg0: { model: any; prompt: string }): { text: any } | PromiseLike<{ text: any }> {
    throw new Error("Function not implemented.")
}
function google(arg0: string): any {
    throw new Error("Function not implemented.")
}

