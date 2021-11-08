const mongoose = require("mongoose");

// Lib
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Model
const Task = require("./task");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter a valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Enter valid password");
        }
      },
    },
    age: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) {
          throw new Error("Enter valid age");
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Virtual for tasks
userSchema.virtual("tasks", {
  ref: "Task", // Reference of model
  localField: "_id", // name of field to be a relationship
  foreignField: "owner", // foreign filed of other model
});

// Hiding data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.tokens;
  delete userObject.password;

  return userObject;
};

// Generating auth tokens
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id.toString() }, "thisIsMeArchit");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Login
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid user");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid user");
  }

  return user;
};

// Hashing Password
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });
  next();
});

// Model
const User = mongoose.model("User", userSchema);
module.exports = User;
