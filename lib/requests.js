import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";
import axios from "axios";
import { Buffer } from "buffer";


export const config = {
    springUrl: 'http://localhost:8080',
    flaskUrl: 'http://localhost:8000',
    scanUrl: 'http://localhost:8001',
}

export const login = async (payload) => {

    try {
        const response = await fetch(`${config.springUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            const { token, userId } = data; // Assume the token is returned in the response

            // Save token securely
            await AsyncStorage.multiSet([
                ["userId", userId],
                ["authToken", token],
            ]);

            Alert.alert("Success", "Login successful!");
            router.replace("/home"); // Navigate to home page
        } else {
            const errorData = await response.json();
            Alert.alert("Error", errorData.message || "Login failed.");
        }
    } catch (err) {
        Alert.alert("Error", "An error occurred while logging in. Please try again.");
    }
};

export const signUp = async (payload) => {
    try {
        const response = await fetch(`${config.springUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            Alert.alert("Success", "User registered successfully!");
            router.push("/login");
        } else {
            const errorData = await response.json();
            Alert.alert("Error", errorData.message || "Signup failed.");
        }
    } catch (err) {
        Alert.alert("Error", "An error occurred while signing up. Please try again.");
    }
}

export const fetchScans = async () => {
    try {
        const userId = await AsyncStorage.getItem("userId");
        const authToken = await AsyncStorage.getItem("authToken");

        if (!userId || !authToken) {
            Alert.alert("Error", "User ID or authentication token is missing.");
            return;
        }

        const response = await axios.get(`${config.springUrl}/images/list/${userId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        if (response.status === 200) {
            return response.data
        } else {
            Alert.alert("Error", "Failed to fetch scans.");
        }
    } catch (error) {
        Alert.alert("Error", "Error when trying to fetch scans.");
    }
}

export const uploadPhotoToS3 = async (uri) => {

    const userId = await AsyncStorage.getItem("userId");
    const authToken = await AsyncStorage.getItem("authToken");

    if (!userId || !authToken) {
        Alert.alert("Error", "User ID or authentication token not found.");
        return;
    }

    try {
        const formData = new FormData();
        const fileName = uri.split("/").pop();
        const fileType = fileName.split(".").pop();

        formData.append("userId", userId);
        formData.append("image", {
            uri,
            name: fileName,
            type: `image/${fileType}`,
        });

        console.log("Form Data: ", formData);

        const response = await axios.post(`${config.springUrl}/images`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${authToken}`, // Add Bearer token
            },
        });

        if (response.status === 200) {
            Alert.alert("Success", "Your scan is succesfully uploaded. You can view the results in the Home tab.");
        } else {
            Alert.alert("Upload Failed", "Please try again later.");
        }
    } catch (error) {
        console.log("Axios Error: ", error);
        Alert.alert("Upload Error", "An error occurred while uploading the photo.");
    }
};

export const initializeApp = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
            router.replace("/first");
            return;
        }

        const response = await fetch(`${config.springUrl}/auth/validate`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            router.replace("/home");
        } else {
            await AsyncStorage.removeItem("authToken");
            router.replace("/first");
        }
    } catch (error) {
        Alert.alert("Error", "An error occurred during initialization.");
    }
};

export const getScanResult = async (scan) => {
    try {
        // Flask backend URL
        const apiUrl = `${config.scanUrl}/analyze`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get scan result from Flask API");
        }

        const result = await response.json();

        return {
            confidence: result.confidence,
            label: result.label,
        };
    } catch (error) {
        console.error("Error in getScanResult:", error.message);
        throw error;
    }
};

export const getSymmetry = async (scan) => {
    try {
        // Flask backend URL
        const apiUrl = `${config.flaskUrl}/analyze_symmetry`;

        // Backend'e POST isteği gönder
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl, // Scan objesinden imageUrl alanı
            }),
        });

        // Response'ı kontrol et
        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get scan result from Flask API");
        }

        // JSON olarak parse et
        const result = await response.json();

        // Beklenen format: { confidence: ..., label: ... }
        return {
            message: result.message,
        };
    } catch (error) {
        console.error("Error in getScanResult:", error.message);
        throw error; // Hata durumunda üst seviyeye hata fırlatılır
    }
};

export const getBorderCircularity = async (scan) => {
    try {
        const apiUrl = `${config.flaskUrl}/analyze_border_circularity`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get border circularity from Flask API");
        }

        // Artık yanıtı JSON olarak okuyoruz:
        const data = await response.json();

        // Flask tarafında dönen veriler:
        //  {
        //    "border_irregularity": <float>,
        //    "circularity": <float>,
        //    "annotated_file_path": <string>
        //  }

        // İstersek annotated_file_path'ı yeniden okuyup Base64'e çevirmek için
        // ikinci bir istek veya sunucu kodunda doğrudan Base64 döndürülebilir.
        // Burada ise doğrudan JSON'dan okunan değerleri döndürdük.
        return {
            borderIrregularity: data.border_irregularity,
            circularity: data.circularity,
            annotatedImageBase64: data.annotated_image_base64,
        };
    } catch (error) {
        console.error("Error in getBorderCircularity:", error.message);
        throw error;
    }
};


export const getGradcamResult = async (scan) => {
    try {
        const apiUrl = `${config.flaskUrl}/gradcam`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get Grad-CAM result from Flask API");
        }

        const buffer = await response.arrayBuffer();
        const base64String = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;

        return base64String; // Return Base64 string directly
    } catch (error) {
        console.error("Error in getGradcamResult:", error.message);
        throw error;
    }
};

export const getSaliencyResult = async (scan) => {
    try {
        const apiUrl = `${config.flaskUrl}/saliency`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get Grad-CAM result from Flask API");
        }

        const data = await response.json();
        return data.saliency_image; // Return Base64 string directly
    } catch (error) {
        console.error("Error in getSaliencyResult:", error.message);
        throw error;
    }
};

export const getHeatmapResult = async (scan) => {
    try {
        const apiUrl = `${config.flaskUrl}/detect_pigmentation`;

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image_url: scan.imageUrl,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Flask API error:", errorText);
            throw new Error("Failed to get Grad-CAM result from Flask API");
        }

        const buffer = await response.arrayBuffer();
        const base64String = `data:image/jpeg;base64,${Buffer.from(buffer).toString("base64")}`;

        return base64String; // Return Base64 string directly
    } catch (error) {
        console.error("Error in getGradcamResult:", error.message);
        throw error;
    }
};

