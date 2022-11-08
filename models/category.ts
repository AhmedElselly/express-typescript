import mongoose, {Schema} from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;