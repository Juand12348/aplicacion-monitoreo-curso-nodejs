import mongoose from "mongoose";

// export interface LogEntityOptions{
//     level: LogSeverityLevel;
//     message: string;
//     createAt?: Date;
//     origin: string;
// }

const logSchema = new mongoose.Schema({
    
    message: {
        type: String,
        require: true
    },
    origin: {
        type: String,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createAt: {
        type: Date,
        default: new Date()
    }

});

export const LogModel = mongoose.model('Log', logSchema);