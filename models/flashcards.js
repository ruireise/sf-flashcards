//Currently not in use
import { MongoClient, ObjectId, Schema } from "mongodb";

const flashcardsSchema = new Schema(
    {
        _id: ObjectId,
        "setID": int,
        "flashcards": [
            {
                "front": String,
                "back": String,
                "type": String,
                "category": String
            }
        ]


    }
)