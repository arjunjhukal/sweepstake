// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { Box, Button, Typography, CircularProgress } from "@mui/material";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { PATH } from "@/routes/PATH";
// import { useForgotPasswordMutation, useVerifyOTPMutation } from "@/services/authApi";
// import { useAppDispatch } from "@/hooks/hook";
// import { showToast, ToastVariant } from "@/slice/toastSlice";

// export default function VerifyOTPPage() {
//     const router = useRouter();
//     const dispatch = useAppDispatch();

//     const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//     const [email, setEmail] = useState<string | null>(null);

//     const [forgotPassword, { isLoading: sending }] = useForgotPasswordMutation();
//     const [verifyOTP, { isLoading: verifying }] = useVerifyOTPMutation();

//     // ✅ Get stored email
//     useEffect(() => {
//         const storedData = localStorage.getItem("passwordResetData");
//         if (storedData) {
//             const parsed = JSON.parse(storedData);
//             setEmail(parsed.email || parsed.emailAddress || null);
//         }
//     }, []);

//     // ✅ Back to login
//     const handleBackToLogin = () => {
//         localStorage.removeItem("passwordResetData");
//         router.replace(PATH.AUTH.LOGIN.ROOT);
//     };

//     // ✅ Handle OTP input change
//     const handleChange = (value: string, index: number) => {
//         if (!/^\d*$/.test(value)) return;
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         if (value && index < 5) {
//             inputRefs.current[index + 1]?.focus();
//         }
//     };

//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus();
//         }
//     };

//     // ✅ Verify OTP
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const enteredOTP = otp.join("");

//         if (enteredOTP.length < 6) {
//             dispatch(showToast({ message: "Please enter all 6 digits", variant: ToastVariant.ERROR }));
//             return;
//         }

//         if (!email) {
//             dispatch(showToast({ message: "Email not available", variant: ToastVariant.ERROR }));
//             return;
//         }

//         try {
//             const res = await verifyOTP({ email, otp: enteredOTP }).unwrap();
//             dispatch(
//                 showToast({
//                     message: res.message || "OTP verified successfully!",
//                     variant: ToastVariant.SUCCESS,
//                 })
//             );
//             router.push(PATH.AUTH.RESET_PASSWORD.ROOT);
//         } catch (err: any) {
//             dispatch(
//                 showToast({
//                     message: err?.data?.message || "Invalid OTP",
//                     variant: ToastVariant.ERROR,
//                 })
//             );
//         }
//     };

//     // ✅ Resend OTP using stored email
//     const handleResendOTP = async () => {
//         if (!email) {
//             dispatch(
//                 showToast({
//                     message: "Email not found in session. Please restart the process.",
//                     variant: ToastVariant.ERROR,
//                 })
//             );
//             return;
//         }

//         try {
//             const response = await forgotPassword({ email }).unwrap();
//             dispatch(
//                 showToast({
//                     message: response.message || "OTP sent successfully!",
//                     variant: ToastVariant.SUCCESS,
//                 })
//             );
//         } catch (err: any) {
//             dispatch(
//                 showToast({
//                     message: err?.data?.message || "Failed to resend OTP",
//                     variant: ToastVariant.ERROR,
//                 })
//             );
//         }
//     };

//     return (
//         <Box className="max-w-[520px] mx-auto flex flex-col gap-3 items-center text-center">
//             <Image src="/assets/images/verify-email.png" alt="Verify OTP" width={180} height={140} />

//             <h1 className="text-[24px] lg:text-[32px] leading-[120%] font-bold mb-4">
//                 Enter the OTP to verify your account
//             </h1>

//             <p className="text-[14px] leading-[120%] font-normal lg:text-[16px] mb-6">
//                 We’ve sent a 6-digit code to{" "}
//                 <strong className="underline text-secondary">
//                     {email || "your email"}
//                 </strong>
//             </p>

//             <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
//                 <div className="flex justify-center gap-3">
//                     {otp.map((digit, index) => (
//                         <input
//                             key={index}
//                             ref={(el) => (inputRefs.current[index] = el)} // ✅ type safe ref
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChange={(e) => handleChange(e.target.value, index)}
//                             onKeyDown={(e) => handleKeyDown(e, index)}
//                             className="w-12 h-14 text-center text-[24px] font-semibold border border-gray-300 rounded-md focus:outline-none focus:border-primary transition-all"
//                         />
//                     ))}
//                 </div>

//                 <Button
//                     fullWidth
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                     disabled={verifying}
//                 >
//                     {verifying ? "Verifying..." : "Verify OTP"}
//                 </Button>
//             </form>

//             <Typography variant="h6" className="text-[20px] lg:text-[28px] leading-[120%] font-bold">
//                 Didn’t get the code?
//             </Typography>

//             <p className="text-[11px] lg:text-[14px] leading-[150%] font-normal">
//                 Please check your <strong>spam or junk folder</strong>. Still not found?{" "}
//                 <strong>Resend OTP below</strong>.
//             </p>

//             <Button
//                 fullWidth
//                 variant="contained"
//                 color="secondary"
//                 disabled={sending}
//                 onClick={handleResendOTP}
//                 startIcon={sending && <CircularProgress size={18} color="inherit" />}
//             >
//                 {sending ? "Sending..." : "Send Again"}
//             </Button>

//             <Button
//                 fullWidth
//                 variant="outlined"
//                 color="primary"
//                 onClick={handleBackToLogin}
//                 className="!mt-4"
//             >
//                 Back to Login
//             </Button>
//         </Box>
//     );
// }
