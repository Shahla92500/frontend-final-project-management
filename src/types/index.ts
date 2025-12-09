export interface Project {
    name: string;
    description: string;
    _id: string;
}
    // user: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'User',
    // required: true
    // },
    // name: {
    //     type: String,
    //     required: true
    //  },
    //  description: {
    //     type: String,
    //     required: true
    //  }
//     const taskSchema = new mongoose.Schema({
//   project: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Project",
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['todo', 'in-progress', 'done']
//   }
// });

// const userSchema = new mongoose.Schema({
//   role: {
//     type: String,
//     default: "user",
//   },
//   githubId:{
//     type: String,
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     match: [/.+@.+\..+/, "Must match an email address!"],
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//   },
// });
