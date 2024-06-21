import { Schema, model } from 'mongoose';


const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: String,
    phone: String,
    country: String,
    about: String,
    dateOfBirth: { type: Date, required: true },
    gender: String,
    address: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    medicalHistory: [{type: Schema.Types.ObjectId, ref:'MedicalHistory'}],
    tests: [{ type: Schema.Types.ObjectId, ref: 'Test' }],
    death: { type: Schema.Types.ObjectId, ref: 'Death' },
    specialties: [{
        type: String,
        required: function() { return this.activeRole === 'doctor'; }
      }],
      certifications: [{
        type: String,
        required: function() { return this.activeRole === 'nurse'; }
      }],
      pharmacyDetails: {
        type: String,
        required: function() { return this.activeRole === 'pharmacy'; }
      }
}, {
    timestamps: true
});



export default model('Profile', ProfileSchema);