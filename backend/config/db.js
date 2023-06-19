import mongoose from 'mongoose'
import colors from 'colors'

// a mongoose stuf (mongoose.connect ....) return always a promise
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://ecommerce:ecommerce@cluster0.xdgwqff.mongodb.net/ecommerce', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            family: 4
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB