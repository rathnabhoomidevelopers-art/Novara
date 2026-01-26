import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "https://novara-backend-one.vercel.app";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters"),
  agreeToTerms: Yup.boolean()
    .oneOf([true], "You must agree to the terms")
    .required("You must agree to the terms"),
});

export default function EcovaraInquiryForm() {
  // Use formik to handle form state and validation
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      agreeToTerms: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      formik.resetForm(); // Reset form after submission

      // Submit the form data to the backend API
      try {
        const response = await fetch(`${API_BASE}/inquiry`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values), // Send the form values
        });

        const data = await response.text(); // Response from the API
        if (response.ok) {
          alert(data); // Show success message
        } else {
          alert("Something went wrong, please try again.");
        }
         navigate("/thankyou", {
          state: {
            name: values.name,
            phone: values.phone,
          },
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting the form.");
      }
    },
  });

  return (
    <div
      className="bg-cover bg-no-repeat bg-center lg:h-[794px] lg:px-[80px] px-[10px] py-[32px] lg:py-[120px]"
      style={{ backgroundImage: "url('/images/enquiry_form.webp')" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-around lg:gap-20 items-start">
          {/* Left Side - Title and Description */}
          <div className="text-white lg:w-[500px]">
            <img src="/images/updated_icon.svg" alt="sparkle" />
            <h1 className="text-[38px] font-brushelva lg:text-5xl mt-[6px] text-[#F5B841] mb-6">
              Inquire About Ecovara Farm Plot
            </h1>

            <p className="text-white font-urbanist text-base lg:text-lg leading-relaxed">
              Interested in this property? Fill out the form below, and our real estate experts will get back to you with more details, including scheduling a viewing and answering any questions you may have.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="bg-transparent border border-white/30 lg:w-[787px] font-urbanist rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* First Name */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm mb-2">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Enter First Name"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-300 text-sm mt-1">{formik.errors.firstName}</div>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm mb-2">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Enter Last Name"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-300 text-sm mt-1">{formik.errors.lastName}</div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm mb-2">Email*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-300 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="lg:col-span-1">
                    <label className="block text-white text-sm mb-2">Phone*</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter Phone Number"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <div className="text-red-300 text-sm mt-1">{formik.errors.phone}</div>
                    )}
                  </div>

                  {/* Message */}
                  <div className="lg:col-span-2">
                    <label className="block text-white text-sm mb-2">Message*</label>
                    <textarea
                      name="message"
                      placeholder="Enter your Message here.."
                      rows="5"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                    />
                    {formik.touched.message && formik.errors.message && (
                      <div className="text-red-300 text-sm mt-1">{formik.errors.message}</div>
                    )}
                  </div>
                </div>

                {/* Checkbox and Submit */}
                <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      id="agreeToTerms"
                      className="mt-1 w-6 h-6 rounded-xl cursor-pointer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      checked={formik.values.agreeToTerms}
                    />
                    <label
                      htmlFor="agreeToTerms"
                      className="text-white text-[14px] lg:text-[16px] cursor-pointer"
                    >
                      I agree with{" "}
                      <span className="underline hover:text-yellow-400">
                        Terms of Use
                      </span>{" "}
                      and{" "}
                      <span className="underline hover:text-yellow-400">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                  {formik.touched.agreeToTerms && formik.errors.agreeToTerms && (
                    <div className="text-red-300 text-sm mt-2">{formik.errors.agreeToTerms}</div>
                  )}

                  <button
                    type="submit" // Ensure button type is submit
                    className="w-full lg:w-auto bg-[#D9A41C] hover:bg-[#F5B841] text-white px-8 py-3 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    Send Your Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
