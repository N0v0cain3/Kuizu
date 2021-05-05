const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,

    name: { type: String },

    googleId: { type: String },

    email: { type: String },

    mobile: { type: Number },

    avatar: {
      type: String,
      default: "",
    },

    college: { type: String, default: "" },

    collegeYear: { type: Number, default: 1 },

    regNumber: { type: String, default: null },

    bio: { type: String, default: "" },

    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },

    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" },
      pincode: { type: Number },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    personal: {
      github: { type: String, default: "" },
      discord: {
        nickname: { type: String, default: "" },
        hash: { type: String, default: "" },
      },
      website: { type: String, default: "" },

      tshirt: {
        type: String,
        enum: ["S", "M", "L", "XL", "XXL"],
        default: "L",
      },

      resume: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },

    isCheckedIn: { type: Boolean },

    inTeam: { type: Boolean, default: false },

    numOtpLogins: { type: Number, default: 0 },

    otpTimestamp: { type: Date },

    otpExpiryTimestamp: { type: Date },

    formSubmitTimeExpiry: { type: Date },

    currentOtp: { type: String, default: 0 },

    fcmToken : { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
