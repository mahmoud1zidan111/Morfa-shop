import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { motion } from "framer-motion";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    confirmPassword: "",
  });

  // ✅ دالة التغيير والتحقق من التطابق
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          value === formData.password
            ? ""
            : "كلمة المرور وتأكيدها غير متطابقين.",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          formData.confirmPassword === value ? "" : prev.confirmPassword,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "كلمة المرور وتأكيدها غير متطابقين." });
      return;
    }

    console.log("✅ تم إرسال البيانات:", formData);
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "linear-gradient(135deg, #eaeaeaff, #ffffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "70px",
        p: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            width: 400,
            p: 4,
            borderRadius: 3,
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#000000ff", mb: 3, fontWeight: "bold" }}
          >
            إنشاء حساب جديد
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="الاسم الأول"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "#ccc" } }}
                  InputProps={{ style: { color: "#000000ff" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#666" },
                      "&:hover fieldset": { borderColor: "#90caf9" },
                      "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="اسم العائلة"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "#ccc" } }}
                  InputProps={{ style: { color: "#000000ff" } }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#666" },
                      "&:hover fieldset": { borderColor: "#90caf9" },
                      "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              label="البريد الإلكتروني"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#000000ff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#90caf9" },
                  "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                },
              }}
            />

            <TextField
              label="كلمة المرور"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#000000ff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#666" },
                  "&:hover fieldset": { borderColor: "#90caf9" },
                  "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                },
              }}
            />

            <TextField
              label="تأكيد كلمة المرور"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#000000ff" } }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#414141ff" },
                  "&:hover fieldset": { borderColor: "#90caf9" },
                  "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.3,
                background: "linear-gradient(90deg, #1976d2, #2196f3)",
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0, #1976d2)",
                },
              }}
            >
              إنشاء الحساب
            </Button>
          </form>

          <Typography
            align="center"
            sx={{ color: "#bbb", fontSize: 14, mt: 2 }}
          >
            لديك حساب بالفعل؟{" "}
            <a
              href="./Account"
              style={{ color: "#90caf9", textDecoration: "none" }}
            >
              تسجيل الدخول
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
