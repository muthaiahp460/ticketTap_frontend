import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ScannerPage = () => {
  const qrRef = useRef(null);
  const [status, setStatus] = useState("Initializing camera...");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    qrRef.current = html5QrCode;

    const startCamera = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();

        if (devices.length) {
          setStatus("Starting camera...");

          const cameraId = devices[0].id;

          await html5QrCode.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            async (decodedText) => {
              setStatus("QR Detected ✅");

              // 🔊 beep
              new Audio("/beep.mp3").play().catch(() => {});

              await html5QrCode.stop();

              // 🔥 VERIFY API
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_API_URL}/booking/verify`,
                  { bookingId: decodedText },
                  { withCredentials: true }
                );

                setResult({
                  success: true,
                  message: res.data.message,
                });

              } catch (err) {
                setResult({
                  success: false,
                  message:
                    err.response?.data?.message || "Invalid Ticket ❌",
                });
              }

              // 🔁 auto redirect after 3s
              setTimeout(() => {
                navigate("/admin");
              }, 3000);
            },
            () => {}
          );

          setStatus("Point camera at QR code");
        }
      } catch (_e) {
        setStatus("Camera error ❌");
      }
    };

    startCamera();

    return () => {
      qrRef.current?.stop().catch(() => {});
    };
  }, []);

  // 🎯 RESULT SCREEN
  if (result) {
    return (
      <div
        className={`fixed inset-0 flex flex-col items-center justify-center text-white text-center ${
          result.success ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <h1 className="text-3xl font-bold mb-4">
          {result.success ? "Entry Allowed 🎉" : "Access Denied ❌"}
        </h1>

        <p className="text-lg">{result.message}</p>

        <p className="mt-6 text-sm opacity-80">
          Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">

      {/* Header */}
      <div className="absolute top-5 text-center">
        <h2 className="text-xl font-semibold">Scan Ticket 🎟️</h2>
        <p className="text-sm text-gray-300 mt-1">{status}</p>
      </div>

      {/* Scanner */}
      <div className="relative">
        <div id="reader" className="w-[300px] h-[300px]" />

        {/* Scan box */}
        <div className="absolute inset-0 border-4 border-green-400 rounded-xl pointer-events-none"></div>
      </div>

      {/* Close */}
      <button
        onClick={() => navigate("/admin")}
        className="mt-8 px-6 py-2 bg-red-500 rounded-lg"
      >
        Cancel
      </button>
    </div>
  );
};

export default ScannerPage;