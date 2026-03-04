const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    
})

async function uploadFile({buffer, filename, folder = ""}){
    try {
        const response = await client.files.upload({
        file: await toFile(buffer, filename), 
        fileName: filename,
        folder,
    })
    return response
    } catch (error) {
        console.error("ImageKit upload Error:", error)
        throw error
    }

    return response
}

module.exports = {uploadFile}