import { jwt } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unqiue: true,
      required: [true, "User name is required"],
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unqiue: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    refreshToken: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// mongoose miggleware : pre method will execute before following event it takes two params : "event" , callback (make sure its not the arrow function)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//defining our own methods with schema

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(this.password, password);
};

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this.id,
      email: this.email,
      userName: this.userName,
    },
    process.env.ACCESS_TOEKN_SECRET,
    { expiresIn: process.env.ACCESS_TOEKN_EXPIRY }
  );
};


userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this.id
    },
    process.env.REFRESH_TOEKN_SECRET,
    { expiresIn: process.env.REFRESH_TOEKN_EXPIRY }
  );
};

const User = mongoose.model("User", userSchema);
