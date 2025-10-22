import React from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function Account() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #eaeaeaff, #ffffffff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
            width: 360,
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
            تسجيل الدخول
          </Typography>

          <TextField
            label="البريد الإلكتروني"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "#000000ff",
                borderColor: "#666",
              },
            }}
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
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ style: { color: "#ccc" } }}
            InputProps={{
              style: {
                color: "#000000ff",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#666" },
                "&:hover fieldset": { borderColor: "#90caf9" },
                "&.Mui-focused fieldset": { borderColor: "#42a5f5" },
              },
            }}
          />

          <Button
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
            تسجيل الدخول
          </Button>

          <Typography
            align="center"
            sx={{ color: "#bbb", fontSize: 14, mt: 2 }}
          >
            ليس لديك حساب؟ {/* tist is link go to the cerat accont  */}
            <a
              href="./CreatAccont"
              style={{ color: "#90caf9", textDecoration: "none" }}
            >
              {/* ========= ceraet acont ========= */}
              إنشاء حساب جديد
            </a>
          </Typography>
        </Paper>
      </motion.div>
    </Box>
  );
}
