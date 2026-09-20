const handleVerifyOtp = async (code) => {
  setLoading(true);
  try {
    const response = await authApi.verifyOtp(phone, code);
    
    // بکند DRF معمولا access و refresh برمی‌گردونه
    if (response.access) {
      localStorage.setItem("accessToken", response.access);
    }
    if (response.refresh) {
      localStorage.setItem("refreshToken", response.refresh);
    }

    if (onSuccess) onSuccess(response);
  } catch (err) {
    setError(err.message || "کد وارد شده اشتباه است");
  } finally {
    setLoading(false);
  }
};